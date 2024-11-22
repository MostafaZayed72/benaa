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
        <Column 
          :header="$t('Image')"
        >
          <template #body="slotProps">
            <img 
              :src="slotProps.data.images[0]?.url || 'https://via.placeholder.com/64'" 
              alt="Product Image" 
              class="w-16 h-16 object-cover rounded-md" 
            />
          </template>
        </Column>
        <Column 
          field="createdAt" 
          :header="$t('Created At')" 
          sortable 
          :body="formatDate"
        />
        <Column :header="$t('Actions')">
          <template #body="slotProps">
            <Button 
              icon="pi pi-pencil" 
              class="p-button-rounded p-button-text text-blue-500" 
              @click="openEditDialog(slotProps.data)"
            />
            <Button 
              icon="pi pi-trash" 
              class="p-button-rounded p-button-text text-red-500" 
              @click="deleteProduct(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
  
      <!-- Dialog for adding or editing a product -->
      <Dialog 
        v-model:visible="dialogVisible" 
        :header="isEditing ? $t('Edit Product') : $t('Add New Product')" 
        modal 
        class="w-1/2"
        :closable="false"
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
            <label class="block font-bold mb-1">{{ $t('Image URL') }}</label>
            <InputText v-model="newProduct.images[0]" class="w-full" />
          </div>
          <div class="flex justify-end gap-4">
            <Button :label="$t('Cancel')" class="p-button-text" @click="closeDialog" />
            <Button :label="$t('Save')" type="submit" class="p-button-success" />
          </div>
        </form>
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
  
  const products = ref([]);
  const dialogVisible = ref(false);
  const isEditing = ref(false);
  const newProduct = ref({
    id: null,
    name: "",
    description: "",
    price: 0,
    commission: 0,
    images: [""]
  });
  

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch products from API
  const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/Products/GetAllProducts`);
    const data = await response.json();
    products.value = data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
  
  // Format date
  const formatDate = (rowData) => {
    const date = new Date(rowData.createdAt);
    return date.toISOString().split("T")[0];
  };
  
  // Dialog handlers
  const openAddDialog = () => {
    isEditing.value = false;
    resetNewProduct();
    dialogVisible.value = true;
  };
  
  const openEditDialog = (product) => {
    isEditing.value = true;
    newProduct.value = { ...product, images: [product.images[0]?.url || ""] };
    dialogVisible.value = true;
  };
  
  const closeDialog = () => {
    dialogVisible.value = false;
    resetNewProduct();
  };
  
  // Reset new product
  const resetNewProduct = () => {
    newProduct.value = {
      id: null,
      name: "",
      description: "",
      price: 0,
      commission: 0,
      images: [""]
    };
  };
  
  // Add or edit product
  const saveProduct = async () => {
  const url = isEditing.value
    ? `${API_BASE_URL}/Products/UpdateProduct`
    : `${API_BASE_URL}/Products/CreateProduct`;

  const method = isEditing.value ? "PUT" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct.value),
    });

    if (response.ok) {
      if (isEditing.value) {
        // Update existing product
        const index = products.value.findIndex((p) => p.id === newProduct.value.id);
        if (index > -1) products.value[index] = { ...newProduct.value };
      } else {
        // Add new product
        const createdProduct = await response.json();
        products.value.push(createdProduct);
      }
      closeDialog();
    } else {
      console.error("Failed to save product.");
    }
    fetchProducts();
  } catch (error) {
    console.error("Error saving product:", error);
  }
};  
  // Delete product
  const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/Products/DeleteProduct/${productId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      products.value = products.value.filter((product) => product.id !== productId);
    } else {
      console.error("Failed to delete product.");
    }
  } catch (error) {
    console.error("Error deleting product:", error);
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
  