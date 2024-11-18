<template>
    <div class="h-screen flex flex-col items-center justify-center"
    style="background-image: url('/imgs/cover.png'); background-repeat: repeat; background-size: cover; background-attachment: fixed; background-position: center bottom;">
        <div class="max-w-md p-6 bg-violet-700 shadow-md rounded-lg">
            <h1 class="text-2xl font-bold mb-6 text-center">{{ $t('تسجيل ممرض جديد') }}</h1>
            <form @submit.prevent="registerNurse" class="space-y-4">
                <InputText v-model="firstName" :placeholder="$t('الاسم الأول')" required class="w-full" />
                <InputText v-model="lastName" :placeholder="$t('اللقب')" required class="w-full" />
                <Dropdown v-model="gender" :options="genders" option-label="label" :placeholder="$t('الجنس')" required class="w-full" />
                <InputText v-model="mobileNo" style="direction: rtl;" :placeholder="$t('رقم الموبايل')" type="tel" required class="w-full" />
                <InputText v-model="whatsAppNo" style="direction: rtl;" :placeholder="$t('رقم الواتساب (اختياري)')" type="tel" class="w-full" />
                <InputText v-model="city" :placeholder="$t('المدينة')" required class="w-full" />
                <Calendar v-model="birthday" :placeholder="$t('تاريخ الميلاد')" class="w-full" required />
                <InputText v-model="email" :placeholder="$t('البريد الإلكتروني')" type="email" required class="w-full" />
                <InputText v-model="password" :placeholder="$t('كلمة المرور')" type="password" required class="w-full" />
                <InputText v-model="confirmPassword" :placeholder="$t('تأكيد كلمة المرور')" type="password" required class="w-full" />

                <h1 class="w-fit bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full mx-auto px-20 font-bold cursor-pointer" @click="registerNurse()">{{ $t('Signup') }}</h1>
            </form>

            <Toast class="pl-16 pl-md-0" style="direction: rtl" />

            <Loader v-if="loading" />

            <Dialog class="text-start" v-model:visible="isDialogVisible" header="نجاح التسجيل" modal>
                <p>{{ $t('A link has been sent to your email to confirm your account') }}</p>
                <Button label="موافق" @click="goToHome" />
            </Dialog>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import Calendar from 'primevue/calendar'
import Dialog from 'primevue/dialog'
import axios from 'axios'
import { useToast } from 'primevue/usetoast'
import { useRouter } from 'vue-router'

// إعداد المتغيرات
const router = useRouter()
const loading = ref(false)
const isDialogVisible = ref(false)
const toast = useToast()

// الحقول المطلوبة
const firstName = ref('')
const lastName = ref('')
const gender = ref(null)
const mobileNo = ref('')
const whatsAppNo = ref('')
const city = ref('')
const birthday = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// قائمة الجنس
const genders = [
    { label: 'ذكر', value: 1 },
    { label: 'أنثى', value: 2 }
]

// دالة لتسجيل الممرض
const registerNurse = async () => {
    if (password.value !== confirmPassword.value) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين' })
        return
    }

    loading.value = true

    // إعداد بيانات الممرض
    const nurseData = {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value.value,
        mobileNo: mobileNo.value,
        whatsAppNo: whatsAppNo.value || null,
        city: city.value,
        birthday: birthday.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    }

    try {
        // إرسال البيانات إلى الـ API
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Users/register`, nurseData)

        toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم اللتسجيل بنجاح' })
        isDialogVisible.value = true
        resetForm()

    } catch (error) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التسجيل' })
        console.error(error)
    } finally {
        loading.value = false
    }
}

// دالة للتحويل إلى الصفحة الرئيسية
const goToHome = () => {
    isDialogVisible.value = false
    router.push('/')
}

// إعادة تعيين الحقول
const resetForm = () => {
    firstName.value = ''
    lastName.value = ''
    gender.value = null
    mobileNo.value = ''
    whatsAppNo.value = ''
    city.value = ''
    birthday.value = ''
    email.value = ''
    password.value = ''
    confirmPassword.value = ''
}
</script>

<style>
input {
    color: black !important;
}

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

.logo-spinner {
    animation: spin 1s linear infinite;
}

.p-select-option {
    justify-content: center !important;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
