<template>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4">Fetch Weather Data</h1>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        @click="fetchWeather"
      >
        Fetch Weather
      </button>
  
      <div v-if="isLoading" class="text-gray-500">Loading...</div>
  
      <div v-if="error" class="text-red-500">Error: {{ error }}</div>
  
      <ul v-if="weatherData.length > 0">
        <li
          v-for="(weather, index) in weatherData"
          :key="index"
          class="border p-4 mb-2 rounded shadow"
        >
          <p><strong>Date:</strong> {{ weather.date }}</p>
          <p><strong>Temperature:</strong> {{ weather.temperatureC }}°C ({{ weather.temperatureF }}°F)</p>
          <p><strong>Summary:</strong> {{ weather.summary }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const weatherData = ref([]); // لتخزين بيانات الطقس
  const isLoading = ref(false); // لتحديد حالة التحميل
  const error = ref(null); // لتخزين الأخطاء
  
  // دالة لجلب البيانات من API
  const fetchWeather = async () => {
    isLoading.value = true; // بدء التحميل
    error.value = null; // تصفير الخطأ
    weatherData.value = []; // تصفير البيانات القديمة
  
    try {
      const response = await fetch('http://api.mun4bus.com/WeatherForecast');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      weatherData.value = data; // تخزين البيانات المسترجعة
    } catch (err) {
      error.value = err.message; // تخزين رسالة الخطأ
    } finally {
      isLoading.value = false; // إنهاء التحميل
    }
  };
  </script>
  
  <style>
  .container {
    max-width: 600px;
  }
  </style>
  