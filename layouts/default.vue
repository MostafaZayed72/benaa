<template>
  <div :class="{ 'dark': isDarkMode }" :style="{ direction: locale === 'ar-AR' ? 'rtl' : 'ltr' }">
    <div class="mb-0 px-20 flex justify-between items-center py-6 sticky top-0 z-10 navbar">
      <div class="flex items-center gap-4 md:hidden">
        <Icon
          @click="toggleSidebar"
          name="iconamoon:menu-burger-horizontal"
          class="text-xl text-white cursor-pointer"
        />
      </div>

      <!-- الروابط في الشاشات الكبيرة -->
      <div class="links md:flex items-center gap-4 hidden">
        <NuxtLink 
          class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
          to="/" 
          active-class="bg-cyan-700 text-yellow-400" 
          exact-active-class="bg-cyan-700 text-yellow-400"
        >
          {{ $t('Home') }}
        </NuxtLink>
      
        <NuxtLink 
          class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
          to="/services"
        >
          {{ $t('Services') }}
        </NuxtLink>
        
        <NuxtLink 
          class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
          to="/about"
          active-class="bg-cyan-700 text-yellow-400" 
          exact-active-class="bg-cyan-700 text-yellow-400"
        >
          {{ $t('About us') }}
        </NuxtLink>
        
        <NuxtLink 
          class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
          to="/contact"
          active-class="bg-cyan-700 text-yellow-400" 
          exact-active-class="bg-cyan-700 text-yellow-400"
        >
          {{ $t('Contact us') }}
        </NuxtLink>
      </div>

      <div class="flex items-center">
        <LanguageSwitcher />
        <DarkModeToggle />
        <div class="flex gap-8 mx-4">
          <NuxtLink 
            class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
            to="/signup"
            active-class="bg-cyan-700 text-yellow-400" 
            exact-active-class="bg-cyan-700 text-yellow-400"
          >
            {{ $t('Sign up') }}
          </NuxtLink>
          
          <NuxtLink 
            class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400 bg-white text-black" 
            to="/login"
            active-class="bg-cyan-700 text-yellow-400" 
            exact-active-class="bg-cyan-700 text-yellow-400"
          >
            {{ $t('Login') }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Burger Menu Transition for Small Screens -->
    <transition name="slide">
      <div v-if="isSidebarOpen" class="bg-cyan-500 md:hidden border-t-2 border-cyan-600">
        <div class="flex flex-col p-4">
          <NuxtLink 
            class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400" 
            to="/" 
            active-class="bg-cyan-700 text-yellow-400" 
            exact-active-class="bg-cyan-700 text-yellow-400"
          >
            {{ $t('Home') }}
          </NuxtLink>
          
          <NuxtLink 
            class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400" 
            to="/services"
          >
            {{ $t('Services') }}
          </NuxtLink>
          
          <NuxtLink 
            class="hover:bg-cyan-700 px-4 py-2 rounded-lg delayed cursor-pointer font-bold hover:text-yellow-400" 
            to="/contact"
            active-class="bg-cyan-700 text-yellow-400" 
            exact-active-class="bg-cyan-700 text-yellow-400"
          >
            {{ $t('Contact us') }}
          </NuxtLink>
        </div>
      </div>
    </transition>
    
    <Loader v-if="loading" />
    <main class="px-0 mt-0">
      <slot @slot-loaded="loading = false" />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const { locale } = useI18n();
const loading = ref(true);
const router = useRouter();
const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});

// التحكم في حالة الـ loading عند التنقل بين الصفحات
router.beforeEach((to, from, next) => {
  loading.value = true;
  next();
});

router.afterEach(() => {
  loading.value = false;
});

// عند تحميل الصفحة لأول مرة
onMounted(() => {
  loading.value = false;
});

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
}

const closeDropdownOnClickOutside = (event) => {
  const dropdown = document.querySelector('.relative'); // عنصر القائمة
  if (dropdown && !dropdown.contains(event.target)) {
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

.slide-enter-active, .slide-leave-active {
  transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}

.slide-enter-to, .slide-leave {
  opacity: 1;
  transform: translateX(0);
}

.navbar {
  background-color: transparent;
  transition: background-color 0.5s ease, box-shadow 0.5s ease;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 10;
}

.navbar.scrolled {
  background-color: aqua;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.hover\:bg-cyan-700:hover {
  background-color: #0aa8c2 !important;
}

.hover\:text-yellow-400:hover {
  color: #ffcc00 !important;
}

.bg-cyan-700 {
  background-color: #0aa8c2 !important;
}

.text-yellow-400 {
  color: #ffcc00 !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>
