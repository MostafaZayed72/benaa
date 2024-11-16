<script setup lang="ts">
const containerRef = ref(null);

const swiper = useSwiper(containerRef, {
  effect: 'creative',
  loop: true,
  autoplay: {
    delay: 5000,
  },
  creativeEffect: {
    prev: {
      shadow: true,
      translate: [0, 0, -400],
    },
    next: {
      shadow: true,
      translate: [0, 0, -400],
    },
  },
});

onMounted(() => {
  console.log(swiper.instance);
});
</script>

<template>
  <ClientOnly>
    <swiper-container ref="containerRef" :init="false" class="custom-swiper">
      <!-- الشرائح الأساسية -->
      <swiper-slide>
       <div>
        <img
          src="https://i0.wp.com/abunawaf.com/wp-content/uploads/2021/11/eBook.jpg?resize=700%2C453&ssl=1"
          alt=""
          class="w-100 rounded-xl px-2"
        />
        <div class="flex flex-col items-center">
          <h1 class="font-bold text-xl my-2">{{ $t('Price') }} : 283$</h1>
<h1 class="font-bold text-gray-500  text-center">كتاب غني عن التعريف يحتوي على الكثير من المعلومات القيمة والتي تجعلك  ...</h1>
<NuxtLink to="" class="mt-4 bg-teal-500 text-white px-2 py-1 rounded-xl cursor-pointer hover:bg-indigo-700 delayed">{{ $t('More Details') }}</NuxtLink>
        </div>
       </div>
      </swiper-slide>

      <!-- الشريحة الجديدة -->
      <!-- <swiper-slide style="background-color: rgb(50, 50, 50); color: white;">
        <h1>
          article
        </h1>
      </swiper-slide> -->
    </swiper-container>
  </ClientOnly>
</template>

<style lang="css">
/* لضبط ارتفاع الحاوية */
.custom-swiper {
  width: 100%;
  
  overflow: hidden;
}

/* لضمان أن كل شريحة تأخذ نفس ارتفاع الحاوية */
swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* لجعل الصور مناسبة للحجم */
.slide-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain; /* تضبط حجم الصورة بما يتناسب مع الحاوية */
}
</style>
