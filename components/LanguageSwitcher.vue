<template>
    <div class="language-switcher  rounded-3xl   py-1 ">

      <div  v-if="locale === 'ar-AR'" class="flex gap-1 items-center cursor-pointer" @click="switchLanguage('en-US')">
       
    <Icon class="text-2xl text-white " name="ic:round-language" />
      </div>
      <div v-if="locale === 'en-US'" class="flex gap-1 items-center cursor-pointer"   @click="switchLanguage('ar-AR')">
       
    <Icon class=" text-2xl text-white" name="ic:round-language" />
      </div>
     
   
    </div>
  </template>
  
  <script setup>
  import { useI18n } from 'vue-i18n';
  import { ref, onMounted } from 'vue';
  
  // استخدام i18n
  const { locale } = useI18n();
  
  // تخزين وإسترجاع اللغة من localStorage
  const switchLanguage = (lang) => {
    locale.value = lang;
    localStorage.setItem('preferredLanguage', lang); // حفظ اللغة في localStorage
  };
  
  // عند تحميل الصفحة
  onMounted(() => {
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    // إذا كانت اللغة محفوظة مسبقاً في localStorage، نستخدمها
    if (storedLanguage) {
      locale.value = storedLanguage;
    } else {
      // إذا لم تكن موجودة، يمكن تعيين اللغة الافتراضية (مثلاً: العربية)
      locale.value = 'ar-AR'; // أو يمكنك جعلها 'en-US' إذا كانت اللغة الافتراضية
      localStorage.setItem('preferredLanguage', locale.value); // حفظ اللغة الافتراضية
    }
  });
  </script>
  
  <style scoped>
  .language-switcher {
    display: flex;
    
  }
  
  
  
  </style>
  