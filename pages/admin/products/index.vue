<template>
    <div>
      <h1 class="text-2xl font-bold mb-6 text-center">{{ $t('Products') }}</h1>
      <div class="flex justify-between items-center mb-4 px-2 md:px-10">
        <Button 
          :label="$t('Add New Product')" 
          icon="pi pi-plus" 
          class="p-button-success bg-green-lighten-4"
          @click="openAddDialog"
        />
      </div>
      <DataTable 
        :value="products" 
        :paginator="true" 
        :rows="10" 
        :rows-per-page-options="[10, 20, 50]" 
        class="p-datatable-sm px-2 md:px-10 rounded"
        responsive-layout="scroll"
      >
        <Column field="name" :header="$t('Name')" sortable />
        <Column field="description" :header="$t('Description')" />
        <Column field="price" :header="$t('Price')" sortable />
        <Column field="commission" :header="$t('Commission')" sortable />
        <Column :header="$t('Image')">
          <template #body="slotProps">
            <img 
              :src="`${API_BASE_URL}/${slotProps.data.images[0]?.url}`" 
              alt="Product Image" 
              class="w-16 h-16 object-cover rounded-md" 
              v-if="slotProps.data.images.length > 0"
            />
            <img 
              src="https://via.placeholder.com/64" 
              alt="No Image Available" 
              class="w-16 h-16 object-cover rounded-md" 
              v-else
            />
          </template>
        </Column>
        <Column field="createdAt" :header="$t('Created At')" sortable>
          <template #body="slotProps">
            <span>{{ formatDate(slotProps.data) }}</span>
          </template>
        </Column>
        <Column :header="$t('Actions')">
          <template #body="slotProps">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-text text-blue-darken-1" 
              @click="navigateToEditPage(slotProps.data.id)"
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-text text-red-darken-1" 
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
  
      <!-- Dialog for adding or editing a product -->
      <Dialog 
        v-model:visible="dialogVisible" 
        :header="isEditing ? $t('Edit Product') : $t('Add New Product')" 
        modal 
        class="w-[90%] md:w-1/2"
        :closable="false"
        :style="$i18n.locale === 'ar-AR' ? 'direction: rtl' : ''"
      >
        <form @submit.prevent="saveProduct">
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Name') }}</label>
            <InputText v-model="newProduct.name" class="w-full" required />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Description') }}</label>
            <InputText v-model="newProduct.description" class="w-full" required />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Price') }}</label>
            <InputNumber v-model="newProduct.price" class="w-full" required currency="USD" />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Commission') }}</label>
            <InputNumber v-model="newProduct.commission" class="w-full" required mode="decimal" />
          </div>
  
          <div class="field mb-4">
    <label class="block font-bold mb-1">{{ $t('Images') }}</label>
    <input type="file" @change="onFileChange" multiple class="w-full" />
  </div>
  
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Current Images') }}</label>
            <div class="flex space-x-2">
              <template v-if="newProduct.images.length > 0">
                <img 
                  v-for="(image, index) in newProduct.images" 
                  :key="index" 
                  :src="`${API_BASE_URL}/${image}`" 
                  alt="Product Image" 
                  class="w-16 h-16 object-cover rounded-md" 
                />
                <Button 
                  icon="pi pi-times" 
                  class="p-button-danger" 
                  @click="removeImage(index)" 
                />
              </template>
              <template v-else>
                <span>{{ $t('No images uploaded') }}</span>
              </template>
            </div>
          </div>
  
          <div class="flex justify-end gap-4">
            <Button :label="$t('Cancel')" class="p-button-text" @click="closeDialog" />
            <Button :label="$t('Save')" type="submit" class="p-button-success" />
          </div>
        </form>
      </Dialog>
  
      <!-- Dialog for delete confirmation -->
      <Dialog 
        v-model:visible="deleteDialogVisible" 
        :header="$t('Delete Product')" 
        modal 
        class="w-[90%] md:w-1/3"
        :style="$i18n.locale === 'ar-AR' ? 'direction: rtl' : ''"
      >
        <p>{{ $t('Are you sure you want to delete this product?') }}</p>
        <div class="flex justify-end gap-4 mt-4">
          <Button 
            :label="$t('Cancel')" 
            class="p-button-text" 
            @click="deleteDialogVisible = false" 
          />
          <Button 
            :label="$t('Delete')" 
            class="p-button-danger" 
            @click="deleteProductConfirmed" 
          />
        </div>
      </Dialog>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import DataTable from "primevue/datatable";
  import Column from "primevue/column";
  import Button from "primevue/button";
  import Dialog from "primevue/dialog";
  import InputText from "primevue/inputtext";
  import InputNumber from "primevue/inputnumber";
  import 'primeicons/primeicons.css';
  
  definePageMeta({
    layout: "admin"
  });
  const router = useRouter(); // تفعيل التنقل عبر الراوتر
  
  // دالة للتنقل إلى صفحة التعديل
  const navigateToEditPage = (productId) => {
    router.push(`/admin/products/${productId}`); // التنقل إلى مسار التعديل
  };
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const products = ref([]);
  const dialogVisible = ref(false);
  const deleteDialogVisible = ref(false);
  const isEditing = ref(false);
  const productToDelete = ref(null);
  const newProduct = ref({
    id: null,
    name: "",
    description: "",
    price: 0,
    commission: 0,
    images: [],
  });
  
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/Products/GetAllProducts`);
      const data = await response.json();
      products.value = data.data;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  
  const formatDate = (rowData) => {
    const date = new Date(rowData.createdAt);
    if (isNaN(date)) {
      return rowData.createdAt; // إذا كانت القيمة غير صالحة، نعرضها كما هي
    }
    return date.toLocaleDateString('en-CA'); // استخدام تنسيق 'en-CA' يعطي تاريخ بصيغة YYYY-MM-DD
  };
  
  const onFileChange = (event) => {
    const files = Array.from(event.target.files);
    newProduct.value.images = files; // تخزين الملفات في مصفوفة الصور
  };
  
  const removeImage = (index) => {
    newProduct.value.images.splice(index, 1); // حذف الصورة من المصفوفة
  };
  
  const openAddDialog = () => {
    isEditing.value = false;
    resetNewProduct();
    dialogVisible.value = true;
  };
  
  const openEditDialog = (product) => {
    isEditing.value = true;
    newProduct.value = { ...product, images: product.images.map(img => img.url) }; // تحميل الصور الحالية
    dialogVisible.value = true;
  };
  
  const closeDialog = () => {
    dialogVisible.value = false;
    resetNewProduct();
  };
  
  const resetNewProduct = () => {
    newProduct.value = {
      id: null,
      name: "",
      description: "",
      price: 0,
      commission: 0,
      images: [],
    };
  };
  
  const saveProduct = async () => {
    const url = isEditing.value
      ? `${API_BASE_URL}/api/Products/UpdateProduct`
      : `${API_BASE_URL}/api/Products/CreateProduct`;
  
    const method = isEditing.value ? "PUT" : "POST";
  
    const formData = new FormData();
    formData.append("name", newProduct.value.name);
    formData.append("description", newProduct.value.description);
    formData.append("price", newProduct.value.price);
    formData.append("commission", newProduct.value.commission);
  
    // إضافة الصور إلى FormData
    newProduct.value.images.forEach((image) => {
      if (image) {
        formData.append("images", image); // تأكد من أن الصورة ليست فارغة
      }
    });
  
    // إضافة `id` فقط عند التحديث
    if (isEditing.value) {
      formData.append("id", newProduct.value.id);
    }
  
    try {
      const response = await fetch(url, {
        method,
        body: formData, // إرسال FormData بدلاً من JSON
      });
  
      if (response.ok) {
        fetchProducts(); // تحديث قائمة المنتجات
        closeDialog(); // إغلاق نافذة الحوار
      } else {
        const errorData = await response.json();
        console.error("Failed to save product:", errorData);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  
  const confirmDeleteProduct = (product) => {
    productToDelete.value = product;
    deleteDialogVisible.value = true;
  };
  
  const deleteProductConfirmed = async () => {
    if (!productToDelete.value) return;
  
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/Products/DeleteProduct?id=${productToDelete.value.id}`,
        { method: "DELETE" }
      );
  
      if (response.ok) {
        products.value = products.value.filter(
          (product) => product.id !== productToDelete.value.id
        );
      } else {
        console.error("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      deleteDialogVisible.value = false;
      productToDelete.value = null;
    }
  };
  
  onMounted(() => {
    fetchProducts();
  });
  </script>
  
  <style scoped>
  h1 {
    margin-bottom: 20px;
  }
  </style>
  