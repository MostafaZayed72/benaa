<script setup>
import { ref, onMounted } from 'vue';

// القيم الأولية للعدادات
const visitorsCount = ref(0);
const customersCount = ref(0);

// الأرقام النهائية التي نريد الوصول إليها
const targetVisitors = 12345; // عدد الزوار
const targetCustomers = 987; // عدد العملاء

// مدة الأنيميشن (ثواني)
const duration = 3;

const startCounter = (target, countRef) => {
  const startTime = Date.now();

  const animateCounter = () => {
    const elapsedTime = (Date.now() - startTime) / 1000;
    if (elapsedTime < duration) {
      countRef.value = Math.floor((target * elapsedTime) / duration);
      requestAnimationFrame(animateCounter);
    } else {
      countRef.value = target;
    }
  };

  animateCounter();
};

onMounted(() => {
  startCounter(targetVisitors, visitorsCount);
  startCounter(targetCustomers, customersCount);
});
</script>

<template>
  <div class="flex justify-center items-center gap-8">
    <!-- دائـرة الزوار -->
    <div class="stat-item bg-violet-700 rounded-full w-40 h-40 flex items-center justify-center text-white shadow-lg text-center relative">
      <div class="circle-loader"></div>
      <div>
        <div class="stat-value text-xl font-bold">{{ visitorsCount }}</div>
        <div class="stat-label mt-2 font-bold">{{ $t('Visits') }}</div>
      </div>
    </div>

    <!-- دائـرة العملاء -->
    <div class="stat-item bg-violet-700 rounded-full w-40 h-40 flex items-center justify-center text-white shadow-lg text-center relative">
      <div class="circle-loader"></div>
      <div>
        <div class="stat-value text-xl font-bold">{{ customersCount }}</div>
        <div class="stat-label mt-2 font-bold">{{ $t('Customers') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.stat-item {
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.stat-item:hover {
  transform: scale(1.1);
}

/* تأثير التحميل حول الدائرة */
.circle-loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.5);
  border-top: 4px solid white;
  animation: spin 1.5s linear infinite;
}

.stat-item:before,
.stat-item:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  height: 80%;
  border-radius: 50%;
  border: 2px dashed rgba(255, 255, 255, 0.5);
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
