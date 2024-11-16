<template>
    <div class="top-marketers-container p-4 text-center mx-auto" style="direction: rtl;">
        <h2 class="text-2xl font-bold mb-8">أعلى المسوقين</h2>
        <div class="flex flex-col gap-3 md:flex-row justify-around">
            <div v-for="marketer in topMarketers" :key="marketer.id" class="marketer-card p-4 bg-sky-700 shadow-md rounded-md md:w-1/4">
                <div>
                    <h3 class="text-xl font-semibold mb-4">{{ marketer.name }}</h3>
                    <p><strong>عدد العملاء: </strong>{{ marketer.clients }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// بيانات المسوقين
const marketers = ref([
    { id: 1, name: 'محمد عبدالله', clients: 120 },
    { id: 2, name: 'خالد فهد', clients: 95 },
    { id: 3, name: 'محمود عبدالخالق', clients: 85 },
   
]);

// ترتيب المسوقين حسب عدد العملاء
const topMarketers = computed(() => {
    return marketers.value
        .sort((a, b) => b.clients - a.clients) // ترتيب المسوقين حسب عدد العملاء
        .slice(0, 3); // اختيار أعلى 3 مسوقين
});
</script>

<style scoped>
.marketer-card {
    transition: transform 0.3s;
}

.marketer-card:hover {
    transform: scale(1.05);
}

.grid {
    display: grid;
    place-items: center;
}

.text-center {
    text-align: center;
}

.p-4 {
    padding: 16px;
}



.shadow-md {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.rounded-md {
    border-radius: 8px;
}

.mb-4 {
    margin-bottom: 1rem;
}

.text-2xl {
    font-size: 1.5rem;
}

.font-bold {
    font-weight: bold;
}

.text-xl {
    font-size: 1.25rem;
}

.sm\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
}

.lg\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
}

.gap-4 {
    gap: 16px;
}

.justify-center {
    justify-content: center;
}
</style>
