<template>
  <div>
    <v-carousel :height="carouselHeight" show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item>
        <div class="relative">
          <img class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="/public/imgs/pic.png" alt="Image" @click="navigateTo('/article')" />
         
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <div class="relative">
          <img v-if="$i18n.locale === 'ar-AR'" class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="/public/imgs/ar.png" alt="Image" @click="navigateTo('/article')" />
          <img v-else class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="/public/imgs/en.png" alt="Image" @click="navigateTo('/article')" />
         
        </div>
      </v-carousel-item>
     
      <!-- <v-carousel-item v-for="(product, index) in products" :key="index">
        <div class="relative">
          <img class="sm:w-100 px-4 rounded-xl md:h-[400px] mx-auto md:w-[70%] "
               :src="product.imageUrl || '/public/imgs/pic.png'" alt="Product Image"  />
               <h1 class="absolute  bg-violet-700 hover:bg-violet-900 delayed text-white text-sm rounded-full px-1 bottom-[-15px]  md:hidden cursor-pointer"
            :class="{ 'left-12 ': $i18n.locale === 'ar-AR', 'right-12 ': $i18n.locale === 'en-US' }" @click="navigateTo(`/product/${product.id}`)">
            {{ $t('More') }}
        </h1>
        <h1 class="absolute  bg-violet-700 hover:bg-violet-900 delayed text-sm text-white rounded-full px-4 py-1 bottom-2 hidden md:block lg:hidden cursor-pointer"
            :class="{ 'left-64 ': $i18n.locale === 'ar-AR', 'right-64 ': $i18n.locale === 'en-US' }" @click="navigateTo(`/product/${product.id}`)">
            {{ $t('More') }}
        </h1>
        <h1 class="absolute  bg-violet-700 hover:bg-violet-900 delayed text-sm text-white rounded-full px-4 py-1 bottom-2 hidden lg:block cursor-pointer"
            :class="{ 'left-80 ': $i18n.locale === 'ar-AR', 'right-80 ': $i18n.locale === 'en-US' }" @click="navigateTo(`/product/${product.id}`)">
            {{ $t('More') }}
        </h1>
        </div>
      </v-carousel-item> -->
     
    </v-carousel>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselHeight = ref(250); // الطول الافتراضي للشاشات الصغيرة
const products = ref([]); // لتخزين المنتجات

// دالة لتحديث الارتفاع بناءً على حجم الشاشة
const updateHeight = () => {
  if (window.innerWidth >= 580) {
    carouselHeight.value = 450; // الطول للشاشات الكبيرة جدًا
  } else if (window.innerWidth >= 490) {
    carouselHeight.value = 350; // الطول للشاشات الكبيرة
  } else if (window.innerWidth >= 410) {
    carouselHeight.value = 300; // الطول للشاشات المتوسطة
  } else {
    carouselHeight.value = 240; // الطول للشاشات الصغيرة
  }
};

// دالة لجلب المنتجات
const fetchProducts = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/Products/GetAllProducts`);
    const data = await response.json();
    products.value = data.data.map(product => ({
  id: product.id,
  imageUrl: `${import.meta.env.VITE_API_BASE_URL}/${product.images?.[0]?.url}`, // استخدام أول صورة مع المسار الكامل
}));

  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

onMounted(() => {
  updateHeight(); // تعيين الارتفاع عند تحميل الصفحة
  fetchProducts(); // جلب المنتجات عند تحميل الصفحة

  // إضافة مستمع للحدث resize لتحديث الارتفاع عند تغيير حجم الشاشة
  window.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
  // إزالة مستمع الحدث عند التخلص من المكون
  window.removeEventListener('resize', updateHeight);
});
</script>




<style>






.v-btn--icon.v-btn--density-default {
  background-color: rgb(85, 12, 153) !important;
  height: 12px !important;
  width: 12px !important;
}

.v-btn--icon.v-btn--density-default {
  color: rgb(251, 250, 252) !important;

}

.mdi:before {
  display: none !important
}

.v-window__right {
  display: none !important
}

.v-window__left {
  display: none !important
}
</style>
