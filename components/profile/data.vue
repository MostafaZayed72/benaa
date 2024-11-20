<template>
  <div class="flex flex-col items-center p-6">
    <!-- تحقق من وجود البيانات -->
    <div v-if="loading" class="text-center">
      <Loader />
    </div>

    <!-- عرض البيانات داخل بطاقة -->
    <div v-else-if="userData" class="bg-green-200 shadow-md rounded-lg md:w-[50%] md:mt-20 py-6 px-10">
      <div class="space-y-4">
        <!-- بيانات المستخدم -->
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="material-symbols:person-rounded" class="text-black text-xl" />{{ $t('Full Name') }}:
          </span>
          <span class="text-gray-900">{{ userData.firstName }} {{ userData.lastName }}</span>
        </div>
        <div class="flex sm:justify-center md:justify-between gap-10">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="mdi:email" class="text-red-400 text-xl" />{{ $t('Email') }}:
          </span>
          <span class="text-gray-900">{{ userData.email }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="material-symbols:smartphone" class="text-black text-xl" />{{ $t('Mobile Number') }}:
          </span>
          <span class="text-gray-900">{{ userData.mobileNo }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="mdi:gender-male-female" class="text-blue-500 text-xl" />{{ $t('Gender') }}:
          </span>
          <span class="text-gray-900">{{ $t(userData.gender) }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="icon-park-solid:city-gate" class="text-black text-xl" />{{ $t('Country') }}:
          </span>
          <span class="text-gray-900">{{ userData.country }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="fa6-solid:tree-city" class="text-green text-xl" />{{ $t('City') }}:
          </span>
          <span class="text-gray-900">{{ userData.city }}</span>
        </div>
        <div class="flex justify-between">
          <span class="font-medium text-gray-600 flex items-center gap-1">
            <Icon name="material-symbols:calendar-month-rounded" class="text-black text-xl" />{{ $t('Birthday') }}:
          </span>
          <span class="text-gray-900">{{ formattedBirthday }}</span>
        </div>
      </div>
      <button
        class="mt-4 bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800 mx-auto text-center flex justify-center delayed"
        @click="openEditDialog"
      >
        {{ $t('Edit Data') }}
      </button>
    </div>

    <!-- Dialog لتعديل البيانات -->
    <Dialog
      v-model:visible="showEditDialog"
      :header="$t('Edit Data')"
      :closable="true"
      :modal="true"
      class="w-[90%] md:w-[50%] bg-green-lighten-3"
      :style="$i18n.locale === 'ar-AR' ? 'direction: rtl' : ''"
    >
      <form @submit.prevent="updateUserData">
        <div class="space-y-4">
          <!-- تعديل بيانات المستخدم -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700">{{ $t('First Name') }}</label>
            <InputText id="firstName" v-model="editData.firstName" type="text" class="bg-white mt-1 block w-full rounded-md border-gray-600 shadow-sm" />
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700">{{ $t('Last Name') }}</label>
            <InputText id="lastName" v-model="editData.lastName" type="text" class="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label for="mobileNo" class="block text-sm font-medium text-gray-700">{{ $t('Mobile Number') }}</label>
            <InputText id="mobileNo" v-model="editData.mobileNo" type="text" class="bg-white mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
          <div>
            <label for="country" class="block text-sm font-medium text-gray-700">{{ $t('Country') }}</label>
            <AutoComplete
              id="country"
              v-model="editData.selectedCountry"
              :suggestions="filteredCountries"
              dropdown
              @complete="searchCountries"
              option-label="name"
              :placeholder="$t('Select Country')"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700">{{ $t('City') }}</label>
            <Dropdown
              id="city"
              v-model="editData.selectedState"
              :options="filteredStates"
              option-label="name"
              :placeholder="$t('Select City')"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label for="birthday" class="block text-sm font-medium text-gray-700">{{ $t('Birthday') }}</label>
            <Calendar id="birthday" v-model="editData.birthday" type="date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
          </div>
        </div>
        <div class="mt-6 flex justify-end">
          <button type="button" class="mx-2 bg-red-300 px-4 py-2 rounded hover:bg-red-400" @click="closeEditDialog">
            {{ $t('Cancel') }}
          </button>
          <button type="submit" class="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">
            {{ $t('Save') }}
          </button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useLocalStorage } from '@vueuse/core';
  import axios from 'axios';
  import  Dialog  from 'primevue/dialog';
  
  const userData = ref(null);
  const loading = ref(true);
  const token = useLocalStorage('token', '');
  const showEditDialog = ref(false);
  const editData = ref({});
  
  // تنسيق تاريخ الميلاد
  const formattedBirthday = computed(() => {
    if (userData.value && userData.value.birthday) {
      const date = new Date(userData.value.birthday);
      return date.toLocaleDateString();
    }
    return '';
  });
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL

  // فتح ديالوج التعديل
  const openEditDialog = () => {
    editData.value = { ...userData.value }; // نسخ البيانات الحالية
    showEditDialog.value = true;
  };
  
  // إغلاق ديالوج التعديل
  const closeEditDialog = () => {
    showEditDialog.value = false;
  };
  
  // تحديث بيانات المستخدم
  const updateUserData = async () => {
  try {
   

    const response = await axios.put(
      `${apiBaseUrl}/api/Users/Update`,
      {
        ...editData.value,
        country : editData.value.selectedCountry.name,
        city : editData.value.selectedState.name,
      },
      {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      }
    );

    if (response.status === 200) {
      fetchUserData(); // تحديث البيانات المعروضة
      closeEditDialog();
    }
  } catch (error) {
    console.error('Error updating user data:', error);
  }
};

  // جلب البيانات من API عند تحميل الصفحة
  const fetchUserData = async () => {
    if (!token.value) {
      return navigateTo('/login');
    }
  
    try {
      const response = await axios.get(`${apiBaseUrl}/api/Users/GetUserData`, {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });
  
      if (response.data && response.data.length > 0) {
        userData.value = response.data[0];
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      loading.value = false;
    }
  };
  
  onMounted(() => {
    fetchUserData();
  });
  import AutoComplete from 'primevue/autocomplete';
import Dropdown from 'primevue/dropdown';
import Calendar from 'primevue/calendar';
import { Country, State } from 'country-state-city';

// بيانات الدول والمحافظات
const countries = ref([]);
const states = ref([]);
const filteredCountries = ref([]);
const filteredStates = ref([]);

// تحميل الدول عند بداية الصفحة
onMounted(() => {
  countries.value = Country.getAllCountries().map(country => ({
    name: country.name,
    isoCode: country.isoCode,
  }));
  filteredCountries.value = countries.value;
});

// فلترة البلدان بناءً على النص المدخل
const searchCountries = event => {
  const query = event.query.toLowerCase();
  filteredCountries.value = countries.value.filter(country =>
    country.name.toLowerCase().includes(query),
  );
};

// تحديث المحافظات بناءً على الدولة المختارة
watch(() => editData.value.selectedCountry, newCountry => {
  if (newCountry) {
    states.value = State.getStatesOfCountry(newCountry.isoCode).map(state => ({
      name: state.name,
      id: state.id,
    }));
    filteredStates.value = states.value;
  } else {
    states.value = [];
    filteredStates.value = [];
  }
});
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
  }

  
  </style>
  