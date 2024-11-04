<template>
  <div class="swiper-container">
    <swiper
      :direction="'vertical'"
      :slides-per-view="1"
      :space-between="30"
      :mousewheel="true"
      :pagination="{
        clickable: true
      }"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide><img src="/public/imgs/logo.jpeg" alt="Logo" /></swiper-slide>
      <swiper-slide>Slide 2</swiper-slide>
      <swiper-slide>Slide 3</swiper-slide>
      <swiper-slide>Slide 4</swiper-slide>
      <swiper-slide>Slide 5</swiper-slide>
      <swiper-slide>Slide 6</swiper-slide>
      <swiper-slide>Slide 7</swiper-slide>
      <swiper-slide>Slide 8</swiper-slide>
      <swiper-slide>Slide 9</swiper-slide>
    </swiper>
  </div>
</template>

<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// Import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Mousewheel, Pagination],
    };
  },
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
}

.swiper-container {
  width: 100%;      /* تأكد من أن الحاوية تأخذ عرض الشاشة بالكامل */
  height: 100vh;   /* ارتفاع كامل للعرض */
}

.mySwiper {
  width: 100%;     /* تأكد من أن swiper يأخذ عرض الحاوية بالكامل */
  height: 100%;    /* تأكد من أن swiper يأخذ ارتفاع الحاوية بالكامل */
}

.swiper-slide {
  
  
  font-size: 24px;  /* يمكنك تعديل الحجم حسب الحاجة */
  background: green; /* لون الخلفية للشرائح */
}

.swiper-slide img {
  max-width: 100%; /* تأكد من أن الصورة لا تتجاوز عرض الشريحة */
  height: auto;    /* احتفظ بنسب الصورة */
}
</style>
