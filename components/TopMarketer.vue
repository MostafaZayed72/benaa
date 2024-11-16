<template>
   <div style="background-image: url('/imgs/ranking.jpg') ;background-size: cover;">
<h1 class="mx-auto text-center mb-10 text-2xl font-bold bg-indigo-700 w-fit px-4 py-2 rounded text-white">{{ $t('Top Marketers') }}</h1>
    <v-carousel
      height="200"
      show-arrows="hover"
      cycle
      hide-delimiter-background
     
    >
      <!-- تكرار المسوقين باستخدام v-for -->
      <v-carousel-item v-for="(marketer, index) in marketers" :key="index">
        <div class="flex flex-col gap-3 md:flex-row justify-center md:justify-around">
          <div class="flex flex-col md:flex-row md:justify-around items-center p-6   rounded-md  md:mx-40 md:w-full">
            <div class="flex mb-4 flex-col items-center md:flex-row justify-center md:gap-2">
                <h3 class="text-xl font-semibold text-black ">{{ marketer.name }}</h3>
                <h3 class="text-sm text-black ">({{$t('Rank')}}: {{ marketer.number }})</h3>

            </div>
            <p class="text-black"><strong >عدد العملاء: </strong>{{ marketer.clients }}</p>
            <p class="text-black"><strong >المدينة: </strong>{{ marketer.city }}</p>
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
      clients: 95,
      city: 'الرياض',
      number:'1'
    },
    {
      name: 'أحمد علي',
      clients: 50,
      city: 'جدة',
      number:'2'
    },
    {
      name: 'سارة محمد',
      clients: 120,
      city: 'الدمام',
      number:'3'
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
  