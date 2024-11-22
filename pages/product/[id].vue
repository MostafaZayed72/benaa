<template>
    <div class="container mx-auto p-4">
      <div v-if="product" class="flex flex-col  gap-6 w-full mx-auto justify-center items-center">
        <!-- Product Images Gallery -->
        <div>
          <Galleria :value="product.images" :responsiveOptions="responsiveOptions" :numVisible="5" :circular="true" containerStyle="max-width: 640px">
            <!-- Template for main image display -->
            <template #item="slotProps">
              <div class="border border-surface-200 dark:border-surface-700 rounded m-2 p-4">
                <div class="mb-4">
                  <div class="relative mx-auto">
                    <img :src="slotProps.item.url" alt="Product Image" class="w-full rounded" />
                  </div>
                </div>
              </div>
            </template>
            
            <!-- Template for thumbnail images -->
            <template v-if="product.images.length > 1" #thumbnail="slotProps">
              <img :src="slotProps.item.url" alt="Thumbnail Image" class="thumbnail-img w-full rounded" />
            </template>
          </Galleria>
        </div>
  
        <!-- Product Details -->
        <div class="space-y-4 text-center">
          <h1 class="text-2xl font-semibold">{{ product.name }}</h1>
          <p class="text-lg text-gray-700 dark:text-green-200">{{ product.description }}</p>
          <div class="flex flex-col items-center space-x-4">
            <div class="text-xl font-bold text-gray-800 dark:text-white">Price: ${{ product.price.toFixed(2) }}</div>
            <div class="text-lg font-semibold text-violet-700 dark:text-violet-500">Commission: ${{ product.commission.toFixed(2) }}</div>
          </div>
  
          <div class="flex gap-8 justify-center">
            <h1 class="bg-violet-500 text-white hover:bg-violet-600 delayed px-3 cursor-pointer rounded">{{ $t('Buy Now') }}</h1>
            <h1 class="bg-green-300 hover:bg-green-400 delayed px-3 cursor-pointer rounded">{{ $t('Market Now') }}</h1>

          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import Galleria from 'primevue/galleria'; // Import Galleria from PrimeVue
  
  const router = useRoute();
  const product = ref(null);
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  
  const responsiveOptions = ref([
    {
      breakpoint: '1400px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ]);
  
  // Function to fetch product data
  const fetchProduct = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/Products/GetProductById?id=${router.params.id}`);
      const data = await response.json();
      product.value = data;
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  
  // Function to format the createdAt date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString; // if the date is invalid, return the raw value
    return date.toLocaleDateString('en-CA'); // YYYY-MM-DD format
  };
  
  // Fetch product on mounted
  onMounted(() => {
    fetchProduct();
  });
  </script>
  
  <style >
  /* Custom styling for the thumbnail images to make them smaller */
  .thumbnail-img {
    height: 60px;  /* Adjust the height of the thumbnail */
    object-fit: cover;  /* Ensures the image fits nicely */
    margin: 0 4px;  /* Add margin between thumbnails */
  }
  
  /* Fixing direction of carousel arrows */
  .p-carousel .p-carousel-prev, .p-carousel .p-carousel-next {
    transform: rotate(0deg) !important; /* Keep arrows pointing left and right */
  }
  
  /* Optional: adjust for RTL layout */
  body[dir="rtl"] .p-carousel .p-carousel-prev {
    transform: rotate(180deg) !important; /* Ensure the left arrow is still facing left */
  }
  
  body[dir="rtl"] .p-carousel .p-carousel-next {
    transform: rotate(0deg) !important; /* Ensure the right arrow is still facing right */
  }

  .p-galleria-thumbnails-content{
    direction: ltr !important;
  }
  </style>
  