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
  <div class="flex flex-col justify-center items-center gap-8 ">
    <div class="stat-item">
        <div class="stat-label  font-bold">{{ $t('Visitors Count') }}</div>
      <div class="stat-value text-teal-500">{{ visitorsCount }}</div>
      
    </div>

    <div class="stat-item">
        <div class="stat-label font-bold">{{ $t('Customers Count') }}</div>
      <div class="stat-value text-teal-500">{{ customersCount }}</div>
      
    </div>
  </div>
</template>

<style scoped>
.stats-container {
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 30px;
  
  padding: 20px;
  border-radius: 10px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 3rem;
  font-weight: bold;
  
}

.stat-label {
  margin-top: 10px;
  font-size: 1.2rem;
  
}
</style>
