<template>
  <div>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded focus:outline-none"
    >
      <i v-if="isDarkMode" class="fas fa-sun text-2xl mt-1 text-white"></i> 
      <i v-else class="fas fa-moon text-2xl mt-2 text-white"></i> 
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import '@fortawesome/fontawesome-free/css/all.css';

const isDarkMode = ref(false)

// استعادة حالة الوضع من التخزين المحلي عند تحميل الصفحة
onMounted(() => {
  const savedColorMode = localStorage.getItem('colorMode')
  if (savedColorMode === 'dark' || savedColorMode === 'light') {
    isDarkMode.value = savedColorMode === 'dark'
    document.body.classList.toggle('dark', isDarkMode.value)
  }
})

// دالة لتبديل الوضع الليلي والنهاري
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.body.classList.toggle('dark', isDarkMode.value)
  // حفظ حالة الوضع في التخزين المحلي
  localStorage.setItem('colorMode', isDarkMode.value ? 'dark' : 'light')
}
</script>

<style>
/* إعدادات اللون عند التبديل بين الوضعين */
body {
  transition: background-color 0.3s, color 0.3s; /* إضافة تأثير انتقال سلس */
}

/* إعداد اللون للخلفية والنصوص عند تفعيل الوضع الليلي */
body.dark {
  background-color: #1e1e1e; /* لون خلفية الوضع الليلي */
  color: white; /* لون النص في الوضع الليلي */
}

/* إعداد اللون للخلفية والنصوص في الوضع النهاري */
body {
  background-color: #ffffff; /* لون خلفية الوضع النهاري */
  color: black; /* لون النص في الوضع النهاري */
}

.Menubar .dark {
  background-color: #1e1e1e; 
}
</style>
