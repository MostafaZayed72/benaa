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
  <div class="flex flex-col justify-center items-center gap-8 md:flex-row md:justify-around">
    <div class="stat-item">
        <div class="stat-label">عدد الزوار</div>
      <div class="stat-value">{{ visitorsCount }}</div>
      
    </div>

    <div class="stat-item">
        <div class="stat-label">عدد العملاء</div>
      <div class="stat-value">{{ customersCount }}</div>
      
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
  color: #3498db;
}

.stat-label {
  margin-top: 10px;
  font-size: 1.2rem;
  
}
</style>
