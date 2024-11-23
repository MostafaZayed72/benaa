<template>
    <div :class="{ 'dark': isDarkMode }" :style="{ direction: locale === 'ar-AR' ? 'rtl' : 'ltr' }">
      <img src="/public/22.png" class="fixed top-10  left-[-20px] z-[-1] md:w-[30%]" alt="">
      <img src="/public/11.png" class="fixed bottom-0  left-[-20px] z-[-1] md:w-[30%]" alt="">
      <img src="/public/33.png" class="fixed bottom-0  right-[-20px] z-[-1] w-[50%] md:w-[30%]" alt="">
      <div class="mb-0 px-4 bg-violet-700 flex justify-between items-center py-2 shadow-xl sticky top-0 z-10 ">
        <div class="flex items-center gap-4">
          <!-- <Icon @click="toggleSidebar" name="iconamoon:menu-burger-horizontal"
            class="md:hidden text-xl text-white cursor-pointer" /> -->
          <img src="/public/imgs/logo.png" class="w-12 h-12 cursor-pointer" alt="" style="border-radius: 50%;"
            @click="navigateTo('/')">
        </div>
  
        <!-- الروابط في الشاشات الكبيرة -->
        <div class="links md:flex items-center gap-4 hidden">
          <NuxtLink
            class="hover:bg-violet-500 px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-yellow-400"
            to="/admin/products" active-class="bg-violet-500 text-yellow-400" exact-active-class="bg-violet-500 text-yellow-400">
            {{ $t('Products') }}
          </NuxtLink>
      
  
  
  
  
        </div>
        <div class="flex items-center ">
  
          <Icon class="text-3xl cursor-pointer text-white hidden md:flex" name="ic:twotone-log-out" v-if="token"
            @click="logout" />
          <LanguageSwitcher />
  
          <DarkModeToggle />
        </div>
      </div>
  
      <!-- Burger Menu Transition for Small Screens -->
      <transition name="slide">
        <div v-if="isSidebarOpen" class="bg-violet-700 md:hidden border-t-2 border-violet-600 h-screen fixed z-10">
          <div class="flex flex-col p-4">
            <NuxtLink
              class="hover:bg-violet-500 px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-yellow-400"
              to="/admin/products" active-class="bg-violet-500 text-yellow-400" exact-active-class="bg-violet-500 text-yellow-400">
              {{ $t('Products') }}
            </NuxtLink>
           
            
       
            <h1 v-if="token" @click="logout"
              class="hover:bg-violet-500 px-4 py-2 rounded-lg delayed cursor-pointer font-bold text-slate-50 hover:text-yellow-400">
              {{ $t('Logout') }}
            </h1>
  
  
          </div>
        </div>
      </transition>
  
      <Loader v-if="loading" />
      <main class="p-0">
        <slot />
        
      </main>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useLocalStorage } from '@vueuse/core'; // استيراد useLocalStorage
  
  const { locale } = useI18n();
  const loading = ref(true);
  const router = useRouter();
  
  // استخدام useLocalStorage بدلاً من localStorage مباشرة
  const token = useLocalStorage('token', null); // "token" هو اسم المفتاح و "null" هو القيمة الافتراضية
  const userID = ref()
  const roles = ref()
  // دالة التحقق من التوكن
  const checkToken = () => {
    if (!token.value) {
      // إذا لم يكن هناك توكن في الـ localStorage، يتم تعيين القيمة الافتراضية
      token.value = localStorage.getItem('token');
    }
  };
  
  // تسجيل الخروج
  const logout = () => {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    navigateTo('/login'); // استخدم router.push بدلاً من navigateTo
  };
  
  // مراقبة التوكن وتحديث حالة token بناءً عليه
  watch(token, (newToken) => {
    if (newToken) {
      // إذا كان هناك توكن، يمكنك تنفيذ عمليات معينة
      console.log("تم تسجيل الدخول");
    } else {
      // إذا لم يكن هناك توكن، تنفيذ عمليات أخرى مثل توجيه المستخدم إلى صفحة التسجيل
      console.log("تم تسجيل الخروج");
    }
  });
  
  // إضافة مستمع لحدث storage في متصفح
  const handleStorageChange = (event) => {
    if (event.key === 'token') {
      // عند تغيير قيمة التوكن في localStorage
      token.value = event.newValue;
    }
  };
  
  onMounted(() => {
    checkToken();
    loading.value = false;
    userID.value = localStorage.getItem("userID")
    roles.value = localStorage.getItem("roles")
  
    // الاستماع إلى تغييرات localStorage
    window.addEventListener('storage', handleStorageChange);
  });
  
  onBeforeUnmount(() => {
    // إزالة مستمع الحدث عند إلغاء تحميل الصفحة
    window.removeEventListener('storage', handleStorageChange);
  });
  
  // التحكم في حالة الـ loading عند التنقل بين الصفحات
  router.beforeEach((to, from, next) => {
    loading.value = true;
    next();
  });
  
  router.afterEach(() => {
    loading.value = false;
  });
  
  const isSidebarOpen = ref(false);
  const isDropdownOpen = ref(false);
  
  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
  }
  
  const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
  }
  
  // إغلاق القائمة عند النقر خارجها
  const closeDropdownOnClickOutside = (event) => {
    const dropdown = document.querySelector('.relative');
    const toggleButton = event.target.closest('h1'); // عنصر النقر لفتح القائمة
    if (dropdown && !dropdown.contains(event.target) && !toggleButton) {
      isDropdownOpen.value = false;
    }
  };
  
  onMounted(() => {
    document.addEventListener('click', closeDropdownOnClickOutside);
  });
  
  onBeforeUnmount(() => {
    document.removeEventListener('click', closeDropdownOnClickOutside);
  });
  
  const route = useRoute();
  
  // للتحقق إذا كان الرابط الحالي يحتوي على كلمة "signup" وتعيين الـ active
  const isSignupActive = computed(() => route.path.endsWith('signup'));
  
  // للتحقق إذا كان أي مسار يحتوي على "signup"
  const isSignupSectionActive = computed(() => {
    return route.path.includes('signup');
  });
  
  // للتحقق إذا كان الرابط الحالي هو "yourNurse"
  const isYourNurseActive = computed(() => route.path.startsWith('/yourNurse'));
  </script>
  
  
  
  
  <style scoped>
  body.dark {
    background-color: #1e1e1e;
    color: white;
  }
  
  .slide-enter-active,
  .slide-leave-active {
    transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
  }
  
  .slide-enter,
  .slide-leave-to {
    opacity: 0;
    transform: translateX(-100%);
  }
  
  .slide-enter-to,
  .slide-leave {
    opacity: 1;
    transform: translateX(0);
  }
  
  .slide-enter {
    opacity: 0;
    transform: translateX(-20px);
  }
  
  .dark .p-menubar .p-menubar-root-list {
    color: white;
  }
  
  .p-menuitem {
    color: black;
  }
  
  .dark .p-menuitem {
    color: white;
  }
  
  .p-menubar {
    color: white;
  }
  
  .relative {
    position: relative;
  }
  
  .absolute {
    position: absolute;
  }
  
  .z-10 {
    z-index: 10;
  }
  
  .bg-white {
    background-color: white;
  }
  
  .text-black {
    color: black;
  }
  
  .shadow-lg {
    box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  }
  
  .rounded {
    border-radius: 0.25rem;
  }
  
  .hover\:bg-gray-100:hover {
    background-color: #f7fafc;
  }
  
  .w-full {
    width: 100%;
  }
  
  .mt-2 {
    margin-top: 0.5rem;
  }
  
  .right-0 {
    right: 0;
  }
  </style>
  