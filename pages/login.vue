<template>
  <div class="p-4 md:p-10 flex flex-col justify-center items-center my-auto h-screen">
    <div class="max-w-md mx-auto p-6  shadow-md rounded-lg my-auto" style="background-color: #7733bc;">
      <h1 class="text-2xl font-bold mb-6 text-center text-white">{{ $t('Login') }}</h1>
      <form @submit.prevent="loginUser" class="space-y-4">
        <InputText v-model="email" placeholder="البريد الإلكتروني" type="email" required
          class="w-full bg-white py-1 rounded-xl px-4" />
        <InputText v-model="password" placeholder="كلمة المرور" type="password" required
          class="w-full bg-white py-1 rounded-xl px-4" />
        <h1
          class="w-fit bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full mx-auto px-6 font-bold cursor-pointer"
          @click="loginUser()">{{ $t('Login') }}</h1>
        <h1 class="text-center text-white text-sm delayed underline cursor-pointer hover:text-blue-400"
          @click="navigateTo('/reset-password')">{{ $t('Forgot password?') }}</h1>
        <h1 class="text-center text-white text-sm">{{ $t("don't have an account?") }} <nuxtLink
            class="text-blue-300 hover:text-blue-400 delayed underline" to="/signup">{{ $t('Sign up now') }}</nuxtLink>
        </h1>
      </form>

      <Toast class="pl-16 pl-md-0 " />

      <Loader v-if="loading" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'
import { useLocalStorage } from '@vueuse/core'  // استيراد useLocalStorage
import 'primeicons/primeicons.css';
definePageMeta({
  layout: "login"
})
const email = ref('')
const password = ref('')
const loading = ref(false)
const toast = useToast()
const router = useRouter()

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

// استخدام useLocalStorage بدلاً من localStorage مباشرة
const token = useLocalStorage('token', '')
const userID = useLocalStorage('userID', '')
const roles = useLocalStorage('roles', [0].value)

const loginUser = async () => {
  loading.value = true

  try {
    const response = await axios.post(`${apiBaseUrl}/api/Users/login`, {
      email: email.value,
      password: password.value,
    })

    // في حالة النجاح، الحصول على التوكن و userID و roles
    const { token: newToken, userID: newUserID, roles: newRoles } = response.data

    // تخزين التوكن و userID و roles باستخدام useLocalStorage
    token.value = newToken
    userID.value = newUserID
    roles.value = newRoles  // تخزين roles

    toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم تسجيل الدخول بنجاح' })

    // توجيه المستخدم إلى الصفحة الرئيسية بعد تسجيل الدخول
    navigateTo('/')
  } catch (error) {
    const errorMsg = error.response?.data?.msg || 'حدث خطأ أثناء تسجيل الدخول'
    toast.add({ severity: 'error', summary: 'error', detail: errorMsg })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
input {
  color: black !important;
}

/* CSS لتوسيع ProgressSpinner ليغطي الشاشة */
.spinner-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}
</style>