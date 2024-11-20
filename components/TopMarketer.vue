<template>
  <div >
    <h1 class="mx-auto text-center text font-bold  w-fit px-4 py-2 rounded-full text-white" style="background-color: #7733bc;">{{ $t('The distinguished marketer') }}</h1>
    <v-carousel height="250" show-arrows="hover" cycle hide-delimiter-background>
      
      <!-- تكرار المسوقين باستخدام v-for -->
      <v-carousel-item v-for="(marketer, index) in marketers" :key="index">
        <div class="flex flex-col gap- md:flex-row justify-center md:justify-around">
          <div class="flex flex-col gap-2 md:flex-row md:justify-around items-center p-6 rounded-md md:mx-40 md:w-full">
            <div class="flex flex-col gap-1 items-center md:flex-row justify-center md:gap-2">
              <img class="w-16 h-16 rounded-full" src="/public/imgs/person.png" alt="">
              <h3 class="text-xl font-semibold text-violet-900 dark:text-green-300">{{ marketer.name }}</h3>
              
              <!-- عرض النجوم بناءً على المركز -->
              <div class="flex">
                <template v-if="marketer.number === '1'">
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                </template>
                <template v-else-if="marketer.number === '2'">
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                </template>
                <template v-else-if="marketer.number === '3'">
                  <Icon name="material-symbols:award-star" class="text-yellow-600" />
                </template>
              </div>
            </div>
            <p class="text-violet-900 dark:text-green-300"><strong>عدد الإحالات: </strong>{{ marketer.clients }}</p>
            <p class="text-violet-900 dark:text-green-300"><strong>المدينة: </strong>{{ marketer.city }}</p>
          </div>
        </div>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script setup>
// تعريف مصفوفة المسوقين
const marketers = [
  {
    name: 'محمد عبدالله',
    clients: 120,
    city: 'الرياض',
    number: '1' // المركز الأول
  },
  {
    name: 'أحمد علي',
    clients: 90,
    city: 'جدة',
    number: '2' // المركز الثاني
  },
  {
    name: 'سارة محمد',
    clients: 50,
    city: 'الدمام',
    number: '3' // المركز الثالث
  }
];
</script>

<style scoped>
/* تخصيص تصميم الـCarousel */
.v-carousel-item {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* تخصيص تصميم البطاقة */
.items-center {
  align-items: center;
}

.text-white {
  color: white;
}

.bg-sky-700 {
  background-color: #0284c7;
}

.rounded-md {
  border-radius: 8px;
}

.p-6 {
  padding: 1.5rem;
}

.mx-4 {
  margin-left: 1rem;
  margin-right: 1rem;
}

.md\:mx-40 {
  margin-left: 10rem;
  margin-right: 10rem;
}

.w-full {
  width: 100%;
}

.md\:justify-around {
  justify-content: space-around;
}

.gap-3 {
  gap: 0.75rem;
}

.text-xl {
  font-size: 1.25rem;
}

.font-semibold {
  font-weight: 600;
}

@media (max-width: 768px) {
  /* تخصيص تصميم مناسب للشاشات الصغيرة */
  .md\:mx-40 {
    margin-left: 2rem;
    margin-right: 2rem;
  }

  /* في الشاشات الصغيرة، ضمان أن البطاقة في المنتصف */
  .md\:justify-around {
    justify-content: center;
  }
}
</style>
