<template>
  <div>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded focus:outline-none"
    
    >
     <h1 class="text-green-900">change</h1>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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

<style >

/* إعداد اللون للخلفية والنصوص عند تفعيل الوضع الليلي */
body.dark {
  background-color: #1e1e1e; /* لون خلفية الوضع الليلي */
  color: white; /* لون النص في الوضع الليلي */
}

/* إعداد اللون للخلفية والنصوص في الوضع النهاري */
body {
  background-color: #ffffff; /* لون خلفية الوضع النهاري */
  color: black; /* لون النص في الوضع النهاري */
  transition: background-color 0.3s, color 0.3s;
}

.Menubar .dark{
  background-color: #1e1e1e; 
}
</style>
