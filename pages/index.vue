<style scoped>
   .background-image {
      background-image: url('/imgs/cover.png');
      background-size: cover;
      background-position: center bottom;
      background-attachment: fixed;
   }

   @media (max-width: 768px) {
      .background-image {
         background-size: 100%; /* تقليص الصورة على الشاشات الصغيرة */
      }
   }
</style>
<template>
   <div class="pb-6 background-image">
      <Welcome class="pt-10" />
      <HomeCarousel class=" md:mt-20"/>
      <CounterStats class="my-10 md:mt-20"/>
      <TopMarketer class="pt-10 md:pt-20"/>
      <Footer class="pt-20 md:pt-20 pb-16" />
   </div>
</template>
