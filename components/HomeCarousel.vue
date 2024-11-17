<template>
  <div>
    <v-carousel height="250" show-arrows="false" cycle hide-delimiter-background>
      <v-carousel-item>
        <div class="relative">
          <!-- الصورة -->
          <img class="w-100 px-4 rounded-xl"
            src="https://radiokielce.pl/wp-content/uploads/2024/09/czytanie-750x375.jpg" alt="Image" />

          <!-- الزر -->
          <button class="absolute btn-more bg-violet-700 hover:bg-violet-900 delayed"
            :class="{ 'left-10': $i18n.locale === 'ar-AR', 'right-10': $i18n.locale === 'en-US' }">
            {{ $t('More') }}
          </button>
        </div>
      </v-carousel-item>

    </v-carousel>
  </div>
</template>

<style>
.relative {
  position: relative;
}

.absolute {
  position: absolute;
  bottom: 10px;
  /* لضبط الزر في الأسفل */
}

.btn-more {
  padding: 8px 16px;

  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.v-btn--icon.v-btn--density-default {
  background-color: rgb(85, 12, 153) !important;
  height: 12px !important;
  width: 12px !important;
}

.v-btn--icon.v-btn--density-default {
  color: rgb(110, 21, 194) !important;

}

.mdi:before {
  display: none !important
}

.v-window__right {
  display: none !important
}

.v-window__left {
  display: none !important
}
</style>
