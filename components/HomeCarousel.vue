<script setup>
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Navigation } from 'vue3-carousel';

// إعداد بيانات الصور والأسعار
const slides = [
  { image: "https://ebooklibery.com/storage/media/5mrhX3cJM3ZzvPDFNKi2dYL957eGVzWMnj2Gscix.webp", price: 50 },
  { image: "https://books-library.net/files/s-books-library.net-03301204Of1X7.jpg", price: 75 },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSI1-8R7wQ82jiRVFkTqjGnPr1yS_6WvwbwGd-LZ5tCRsapVnCqI17mjRY4yA66B7tmSwU&usqp=CAU", price: 100 },
  { image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpQMTyWwgxmo4frU8CitKpuRkNAhkGsmgoWxMGb0gp1Gxt65sh5oNvn3h0EDMu2O7izMs&usqp=CAU", price: 125 },
  { image: "https://foulabook.com/storage/photo/73999.2020-07-14.1594687956.jpg", price: 150 },
  { image: "https://foulabook.com/storage/photo/33530.2021-08-16.1629147893.jpg", price: 200 },
  
];

const config = {
  autoplay: 3000,
  itemsToShow: 3.95,
  wrapAround: true,
  transition: 500,
};
</script>

<template>
  <Carousel v-bind="config">
    <Slide v-for="(slide, index) in slides" :key="index">
      <div class="mx-4">
        <!-- عرض الصورة -->
        <img :src="slide.image" alt="Image" class="w-40 h-40 md:w-100 md:h-80 rounded-xl" />
        <!-- عرض السعر -->
        <p class="carousel__price mb-2">{{ $t('Price') }}: ${{ slide.price }}</p>
        <NuxtLink to="" class="bg-sky-700 text-white px-2 py-1 rounded hover:bg-sky-500 delayed cursor-pointer ">{{$t('View')  }}</NuxtLink>
      </div>
    </Slide>

    <template #addons>
      <Navigation />
    </template>
  </Carousel>
</template>

<style>
.carousel__item {
  text-align: center;
}

.carousel__image {
  width: 100%;

  border-radius: 8px;
  margin-bottom: 10px;
}

.carousel__price {
  font-size: 1rem;
  font-weight: bold;
}
</style>
