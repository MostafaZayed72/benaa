<template>
  <div>
    <button @click="toggleDarkMode" class="p-2 rounded focus:outline-none">
      <!-- التأكد من عرض الأيقونة الصحيحة عند تحميل الصفحة -->
      <span v-if="!isDarkMode">
        <Icon name="ri:moon-line" class="text-2xl mt-3 text-white" />
      </span>
      <span v-else>
        <Icon name="material-symbols:clear-day-rounded" class="text-2xl mt-1 text-white" />
      </span>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isDarkMode = ref(false)

// استعادة حالة الوضع من التخزين المحلي عند تحميل الصفحة
onMounted(() => {
  const savedColorMode = localStorage.getItem('colorMode')
  if (savedColorMode) {
    isDarkMode.value = savedColorMode === 'dark'
  }
  // ضبط الوضع الليلي إذا كان محجوزًا في التخزين
  document.body.classList.toggle('dark', isDarkMode.value)
})

// مراقبة حالة الوضع لضمان تحديث الأيقونة عند التبديل
watch(isDarkMode, (newValue) => {
  document.body.classList.toggle('dark', newValue)
  localStorage.setItem('colorMode', newValue ? 'dark' : 'light')
})

// دالة لتبديل الوضع الليلي والنهاري
const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
}
</script>

<style scoped>
/* إعدادات اللون عند التبديل بين الوضعين */
body {
  transition: background-color 0.3s, color 0.3s;
}

body.dark {
  background-color: #1e1e1e;
  color: white;
}

body {
  background-color: #ffffff;
  color: black;
}
</style>
