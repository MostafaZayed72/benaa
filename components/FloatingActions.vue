<template>
    <div>
      <!-- زر واتساب -->
      <a 
        href="https://wa.me/yourwhatsappnumber" 
        target="_blank" 
        class="fixed bottom-4 bg-green-500 text-white p-3 rounded-full shadow-lg flex w-10 h-10 items-center justify-center hover:bg-green-600 transition-all duration-300"
        :class="locale === 'ar-AR' ? 'left-4' : 'right-4'"
      >
        <i class="fab fa-whatsapp text-xl md:text-2xl"></i>
      </a>
  
      <!-- زر الرجوع للأعلى -->
      <button 
        @click="scrollToTop" 
        class="fixed bottom-4 bg-green-500 text-white p-3 w-10 h-10 rounded-full shadow-lg flex items-center justify-center hover:bg-green-600 transition-all duration-300"
        :class="locale === 'ar-AR' ? 'right-4' : 'left-4'"
      >
        <i class="fas fa-arrow-up md:text-2xl"></i>
      </button>
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';
  const { locale } = useI18n();
  
  // دالة الرجوع للأعلى
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  </script>
  