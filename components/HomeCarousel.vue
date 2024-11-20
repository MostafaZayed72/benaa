<template>
  <div>
    <v-carousel :height="carouselHeight" show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item>
        <div class="relative">
          <img class="sm:w-100 px-4 rounded-xl md:h-[400px] mx-auto md:w-[70%] "
            src="/public/imgs/product.png" alt="Image" />

          <h1 class="absolute  bg-violet-700 hover:bg-violet-900 delayed text-sm rounded-full px-1 bottom-0  md:hidden"
            :class="{ 'left-16 ': $i18n.locale === 'ar-AR', 'right-16 ': $i18n.locale === 'en-US' }">
            {{ $t('More') }}
        </h1>
          <h1 class="absolute  bg-violet-700 hover:bg-violet-900 delayed text-sm rounded-full px-4 py-1 bottom-2 hidden md:block"
            :class="{ 'left-64 ': $i18n.locale === 'ar-AR', 'right-64 ': $i18n.locale === 'en-US' }">
            {{ $t('More') }}
        </h1>
        </div>
      </v-carousel-item>
      <v-carousel-item>
        <div class="relative">
          <img class="sm:w-100 md:w-[70%] px-4 rounded-xl relative cursor-pointer md:h-[400px] mx-auto" src="/public/imgs/pic.png" alt="Image" @click="navigateTo('/about')" />
         
        </div>
      </v-carousel-item>

    </v-carousel>
  </div>
</template>


<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const carouselHeight = ref(250); // الطول الافتراضي للشاشات الصغيرة

// دالة لتحديث الارتفاع بناءً على حجم الشاشة
const updateHeight = () => {
  if (window.innerWidth >= 580) {
    carouselHeight.value = 450; // الطول للشاشات الكبيرة جدًا
  } 
  else if (window.innerWidth >= 490) {
    carouselHeight.value = 350; // الطول للشاشات الكبيرة
  } else if (window.innerWidth >= 410) {
    carouselHeight.value = 300; // الطول للشاشات المتوسطة
  } else {
    carouselHeight.value = 250; // الطول للشاشات الصغيرة
  }
};

onMounted(() => {
  updateHeight(); // تعيين الارتفاع عند تحميل الصفحة

  // إضافة مستمع للحدث resize لتحديث الارتفاع عند تغيير حجم الشاشة
  window.addEventListener('resize', updateHeight);
});

onUnmounted(() => {
  // إزالة مستمع الحدث عند التخلص من المكون
  window.removeEventListener('resize', updateHeight);
});
</script>



<style>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  bottom: 10px;
  /* لضبط الزر في الأسفل */
}

.btn-more {
  padding: 8px 16px;

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

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
