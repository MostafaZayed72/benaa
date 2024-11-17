<script setup>
import { ref, onMounted } from 'vue';

// القيم الأولية للعدادات
const visitorsCount = ref(0);
const customersCount = ref(0);

// الأرقام النهائية التي نريد الوصول إليها
const targetVisitors = 12345;
const targetCustomers = 987;

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
    <!-- دائرة الزوار -->
    <div class="stat-item">
      <div class="stat-content">
        <div class="text-xl font-bold">{{ visitorsCount }}</div>
        <div class="text-xl font-bold">{{ $t('Visits') }}</div>
      </div>
    </div>

    <!-- دائرة العملاء -->
    <div class="stat-item">
      <div class="stat-content">
        <div class="text-xl font-bold">{{ customersCount }}</div>
        <div class="text-xl font-bold">{{ $t('Customers') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* تصميم الدوائر */
.stat-item {
  position: relative;
  width: 200px;
  height: 200px;
  background-image: url('/public/imgs/test.png'); /* ضع مسار الصورة هنا */
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  
}

/* محتوى الدائرة */
.stat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* النص داخل الدائرة */
.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 1rem;
  font-weight: normal;
}
</style>
