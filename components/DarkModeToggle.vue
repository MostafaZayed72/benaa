<template>
  <div>
    <button
      @click="toggleDarkMode"
      class="p-2 rounded focus:outline-none"
    
    >
     <Icon v-if="isDarkMode" name="line-md:sun-rising-filled-loop" class="text-2xl mt-1 text-yellow-400"/>
      <span  v-else >🌙</span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const isDarkMode = ref(false)

// استعادة حالة الوضع من التخزين المحلي عند تحميل الصفحة
onBeforeMount(() => {
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

.Menubar .dark{
  background-color: #1e1e1e; 
}
</style>
