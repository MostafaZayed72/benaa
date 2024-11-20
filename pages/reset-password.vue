<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Dialog from 'primevue/dialog';

const email = ref('');
const token = ref('');
const password = ref('');
const confirmPassword = ref('');

const isTokenSent = ref(false);

const message = ref('');
const isError = ref(false);

const sendEmail = async () => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Users/forgot-password?email=${email.value}`, {
        
    });
    isTokenSent.value = true;
    message.value = 'تم إرسال الرمز إلى بريدك الإلكتروني';
    isError.value = false;
  } catch (error) {
    isError.value = true;
    message.value = 'حدث خطأ أثناء إرسال البريد. تأكد من صحة البيانات.';
  }
};
const showDialog = ref(false);

// إعادة تعيين كلمة المرور
const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    isError.value = true;
    message.value = 'كلمة المرور وتأكيدها غير متطابقين.';
    return;
  }
  try {
    const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Users/reset-password`, {
      token: token.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
    message.value = 'تم إعادة تعيين كلمة المرور بنجاح!';
    isError.value = false;
    showDialog.value = true; // عرض الـ Dialog عند النجاح
  } catch (error) {
    isError.value = true;
    message.value = 'حدث خطأ أثناء إعادة تعيين كلمة المرور. تحقق من البيانات المدخلة.';
  }
};
</script>

<template>
  <div class="container mx-auto p-6 mt-48 ">
    <h1 class="text-2xl font-bold mb-4 text-center">استعادة كلمة المرور</h1>
    <div class=" shadow-md rounded md:w-[50%] mx-auto ">
      <!-- الرسائل -->
      <p v-if="message" :class="isError ? 'text-red-500' : 'text-green-500'" class="mb-4">
        {{ message }}
      </p>

      <!-- الخطوة الأولى: إدخال البريد الإلكتروني -->
      <div v-if="!isTokenSent" class="pb-4" >
        <label for="email" class="block text-sm font-medium  mb-2">البريد الإلكتروني</label>
        <input
          id="email"
          type="email"
          v-model="email"
          placeholder="أدخل بريدك الإلكتروني"
          class="input-text w-fit"
        />
        <button @click="sendEmail" class="w-fit bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full mx-auto px-6 font-bold cursor-pointer flex justify-center  ">إرسال</button>
      </div>

      <!-- الخطوة الثانية: إدخال التفاصيل -->
      <div v-else class="pb-4">
        <label for="token" class="block text-sm font-medium  mb-2">الرمز</label>
        <input
          id="token"
          v-model="token"
          placeholder="أدخل الرمز المرسل"
          class="input-text"
        />

        <label for="password" class="block text-sm font-medium text-gray-700 mb-2 mt-4">كلمة المرور الجديدة</label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="كلمة المرور الجديدة"
          class="input-text"
        />

        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-2 mt-4">تأكيد كلمة المرور</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          placeholder="تأكيد كلمة المرور"
          class="input-text"
        />

        <button @click="resetPassword" class="w-fit bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full mx-auto px-6 font-bold cursor-pointer flex justify-center">إعادة التعيين</button>
      </div>
      <Dialog v-model:visible="showDialog" header="نجاح العملية" :closable="false" class="text-center mx-auto flex justify-center" :style="$i18n.locale === 'ar-AR' ? 'direction: rtl' : ''">
  <p>تم إعادة تعيين كلمة المرور بنجاح!</p>
  <button
    @click="$router.push('/login')"
    class="w-full bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full px-6 font-bold cursor-pointer"
  >
    موافق
  </button>
</Dialog>

    </div>
  </div>
</template>

<style scoped>
.input-text {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
}

.btn-primary {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  text-align: center;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #2563eb;
}
</style>
