<template>
    <div>
        <h1 class="flex mx-4 md:mx-40 mb-2 gap-1  justify-center">
            {{ $t('Welcome') }} {{ firstName }}, {{ $t('nice to see you in your shop') }}
            <Icon class="text-orange-400 text-xl" name="material-symbols:waving-hand-sharp" />
        </h1>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useLocalStorage } from '@vueuse/core';
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// متغير لتخزين اسم المستخدم
const firstName = ref('');
const token = useLocalStorage('token', ''); // استرجاع التوكن من localStorage

const fetchUserData = async () => {
  if (!token.value) {
    console.error('Token not found');
    return;
  }

  try {
    const response = await axios.get(`${apiBaseUrl}/api/Users/GetUserData`, {
      headers: {
        Authorization: `Bearer ${token.value}`, // إرسال التوكن في الهيدر
      },
    });

    if (response.data && response.data.length > 0) {
      // حفظ الاسم الأول من البيانات المستلمة
      firstName.value = response.data[0].firstName;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// جلب البيانات عند تحميل الصفحة
onMounted(() => {
  fetchUserData();
});
</script>
