<template>
    <div class="h-screen flex flex-col items-center justify-center"
        >
        <div class="max-w-md p-6  shadow-md rounded-lg"
            >
            <h1 class="text-2xl font-bold mb-6 text-center">{{ $t('Sign up new account') }}</h1>
            <form @submit.prevent="registerNurse" class="space-y-4">
                <InputText v-model="firstName" :placeholder="$t('First Name')" required class="w-full bg-white" />
                <InputText v-model="lastName" :placeholder="$t('Last Name')" required class="w-full bg-white" />
                <Dropdown v-model="gender" :options="genders" option-label="label" :placeholder="$t('Gender')" required class="w-full bg-white" />
                <InputText v-model="mobileNo" style="direction: rtl;" :placeholder="$t('Mobile Number')" type="tel" required class="w-full bg-white" />
                <!-- <InputText v-model="whatsAppNo" style="direction: rtl;" :placeholder="$t('رقم الواتساب (اختياري)')" type="tel" class="w-full" /> -->
                
                <!-- قائمة الدولة مع فلترة بحث باستخدام AutoComplete -->
                <AutoComplete v-model="selectedCountry" :suggestions="filteredCountries" 
                 dropdown   @complete="searchCountries" option-label="name" :placeholder="$t('Select Country')" required class="w-full bg-white" />

                <!-- قائمة المحافظة مع فلترة بحث باستخدام Dropdown -->
                <Dropdown v-model="selectedState" :options="filteredStates" option-label="name" :placeholder="$t('Select City')" required class="w-full bg-white" />

                <Calendar v-model="birthday" :placeholder="$t('Birthday')" class="w-full bg-white" required />
                <InputText v-model="email" :placeholder="$t('Email')" type="email" required class="w-full bg-white" />
                <InputText v-model="password" :placeholder="$t('Password')" type="password" required class="w-full bg-white" />
                <InputText v-model="confirmPassword" :placeholder="$t('Confirm Password')" type="password" required class="w-full bg-white" />

                <h1 class="w-fit bg-green-300 hover:bg-green-400 delayed text-center text-black py-1 rounded-full mx-auto px-20 font-bold cursor-pointer" @click="registerNurse()">{{ $t('Signup') }}</h1>
            </form>

            <Toast class="pl-16 pl-md-0" style="direction: rtl" />
            <Loader v-if="loading" />
            <Dialog class="text-start" v-model:visible="isDialogVisible" :header="$t('Registered Successfully')" modal>
                <p>{{ $t('A link has been sent to your email to confirm your account') }}</p>
                <Button :label="$t('Ok')" @click="goToHome" />
            </Dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import axios from 'axios';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import AutoComplete from 'primevue/autocomplete';

// مكتبة جلب البيانات
import { Country, State } from 'country-state-city';

// إعداد المتغيرات
const router = useRouter();
const loading = ref(false);
const isDialogVisible = ref(false);
const toast = useToast();

// الحقول المطلوبة
const firstName = ref('');
const lastName = ref('');
const gender = ref(null);
const mobileNo = ref('');
const whatsAppNo = ref('');
const selectedCountry = ref(null);
const selectedState = ref(null);
const birthday = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');

// بيانات الدول والمحافظات
const countries = ref([]);
const states = ref([]);

// قائمة الجنس
const genders = [
    { label: 'ذكر', value: 1 },
    { label: 'أنثى', value: 2 }
];

// قائمة البلدان المفلترة
const filteredCountries = ref([]);

// قائمة المحافظات المفلترة
const filteredStates = ref([]);

// تحميل الدول عند بداية الصفحة
onMounted(() => {
    countries.value = Country.getAllCountries().map(country => ({
        name: country.name,
        isoCode: country.isoCode
    }));
    filteredCountries.value = countries.value; // تعيين الدول للفلترة المبدئية
});

// فلترة البلدان بناءً على النص المدخل
const searchCountries = (event) => {
    const query = event.query.toLowerCase();
    filteredCountries.value = countries.value.filter(country =>
        country.name.toLowerCase().includes(query)
    );
};

// تحديث المحافظات بناءً على الدولة المختارة
watch(selectedCountry, (newCountry) => {
    if (newCountry) {
        states.value = State.getStatesOfCountry(newCountry.isoCode).map(state => ({
            name: state.name,
            id: state.id
        }));
        filteredStates.value = states.value; // تعيين المحافظات للفلترة المبدئية
    } else {
        states.value = [];
        filteredStates.value = [];
    }
});

// فلترة المحافظات بناءً على النص المدخل
const searchStates = (event) => {
    const query = event.query.toLowerCase();
    filteredStates.value = states.value.filter(state =>
        state.name.toLowerCase().includes(query)
    );
};

// دالة لتسجيل الممرض
const registerNurse = async () => {
    if (password.value !== confirmPassword.value) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: 'كلمة المرور وتأكيد كلمة المرور غير متطابقتين' });
        return;
    }

    loading.value = true;

    // إضافة يوم واحد إلى تاريخ الميلاد
    const localBirthday = new Date(birthday.value);
    localBirthday.setDate(localBirthday.getDate() + 1); // إضافة يوم واحد للتاريخ

    const nurseData = {
        firstName: firstName.value,
        lastName: lastName.value,
        gender: gender.value.value,
        mobileNo: mobileNo.value,
        country: selectedCountry.value.name,
        city: selectedState.value.name,
        birthday: localBirthday.toISOString(), // إرسال التاريخ بتنسيق ISO 8601
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
    };

    try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/Users/register`, nurseData);
        toast.add({ severity: 'success', summary: 'نجاح', detail: 'تم التسجيل بنجاح' });
        isDialogVisible.value = true;
        resetForm();
    } catch (error) {
        toast.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التسجيل' });
        console.error(error);
    } finally {
        loading.value = false;
    }
};

// دالة للتحويل إلى الصفحة الرئيسية
const goToHome = () => {
    isDialogVisible.value = false;
    router.push('/');
};
definePageMeta({
  layout: "login"
})

// إعادة تعيين الحقول
const resetForm = () => {
    firstName.value = '';
    lastName.value = '';
    gender.value = null;
    mobileNo.value = '';
    whatsAppNo.value = '';
    selectedCountry.value = null;
    selectedState.value = null;
    birthday.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
};
</script>
