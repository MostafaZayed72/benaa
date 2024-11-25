<template>
    <div class="mt-16">
  
      <div v-if="loading">
        <Loader />
      </div>
  
      <div v-else-if="product" class="product-details p-4 md:p-10 bg-gray-50 rounded-lg shadow-md mt-20">
        <form @submit.prevent="updateProduct">
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Name') }}</label>
            <InputText v-model="product.name" class="w-full" required />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Description') }}</label>
            <InputText v-model="product.description" class="w-full" required />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Price') }}</label>
            <InputNumber v-model="product.price" class="w-full" required currency="USD" />
          </div>
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Commission') }}</label>
            <InputNumber v-model="product.commission" class="w-full" required mode="decimal" />
          </div>
  
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Add New Images') }}</label>
            <input type="file" @change="onFileChange" multiple class="w-full text-violet-700" />
          </div>
  
          <div class="field mb-4">
            <label class="block font-bold mb-1">{{ $t('Current Images') }}</label>
            <div class="flex flex-wrap gap-2 items-center">
              <div v-for="(image, index) in product.images" :key="index" class="relative group">
                <img :src="`${API_BASE_URL}/${image.url}`" alt="Product Image" class="w-20 h-20 object-cover rounded-md shadow-md" />
              </div>
            </div>
          </div>
  
          <div class="flex justify-end gap-4">
            <Button :label="$t('Cancel')" class="p-button-text" @click="goBack" />
            <Button :label="$t('Save Changes')" type="submit" class="p-button-success" />
          </div>
        </form>
      </div>
  
      <div v-else>
        <p class="text-red-500">{{ $t('Product not found.') }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import InputText from "primevue/inputtext";
  import InputNumber from "primevue/inputnumber";
  import Button from "primevue/button";
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  
  const route = useRoute();
  const router = useRouter();
  
  const product = ref(null);
  const loading = ref(true);
  const updatedImages = ref([]);
  
  // Fetch product details by ID
  const fetchProduct = async () => {
    const id = route.params.id;
    try {
      const response = await fetch(`${API_BASE_URL}/api/Products/GetProductById?id=${id}`);
      const data = await response.json();
      if (data.id) {
        product.value = data;
      } else {
        throw new Error("Product not found.");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      product.value = null;
    } finally {
      loading.value = false;
    }
  };
  
  // Handle file change
  const onFileChange = (event) => {
    updatedImages.value = Array.from(event.target.files); // Store new images
  };
  
  // Remove existing image
  const removeImage = (index) => {
    product.value.images.splice(index, 1); // Remove image from product data
  };
  
  // Update product
  const updateProduct = async () => {
    const formData = new FormData();
  
    formData.append("id", product.value.id);
    formData.append("name", product.value.name);
    formData.append("description", product.value.description);
    formData.append("price", product.value.price);
    formData.append("commission", product.value.commission);
  
    // Append current images as files (if needed)
    product.value.images.forEach((image) => {
      // Assuming you want to keep the current images, you might need to handle them differently
      // For example, if you want to keep the URLs, you can skip appending them here
      // formData.append("images", image.url); // Uncomment if you want to keep URLs
    });
  
    // Append new images
    updatedImages.value.forEach((image) => {
      formData.append("images", image); // Add new images
    });
  
    try {
      const response = await fetch(`${API_BASE_URL}/api/Products/updateProduct`, {
        method: "PUT",
        body: formData,
      });
  
      if (response.ok) {
        router.push("/admin/products"); // Navigate back to the products list
      } else {
        const errorData = await response.json();
        console.error("Failed to update product:", errorData);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };
  
  // Go back to previous page
  const goBack = () => {
    router.back();
  };
  
  // Fetch product data on mount
  onMounted(() => {
    fetchProduct();
  });
  definePageMeta({
    layout: 'admin'
  })
  </script>
  
  <style scoped>
  .product-details img {
    max-width: 80px;
    max-height: 80px;
    
  }
  </style>
  