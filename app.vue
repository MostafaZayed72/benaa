<template>
  <div :style="{ direction: locale === 'ar-AR' ? 'rtl' : 'ltr' }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useLocalStorage } from '@vueuse/core';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n(); // استخدام useI18n للوصول إلى locale

const preferredLanguage = useLocalStorage('preferredLanguage', 'en-US'); // القيمة الافتراضية يمكن أن تكون 'en-US'

// استخدام watch لمراقبة تغييرات preferredLanguage
watch(preferredLanguage, (newValue) => {
  console.log('Language changed to:', newValue);
  // تعيين اللغة في i18n
  if (newValue) {
    locale.value = newValue; // تعيين locale مباشرة
  }
});

// تعيين اللغة الأولى عند التحميل
if (!preferredLanguage.value) {
  preferredLanguage.value = 'en-US'; // تعيين قيمة افتراضية إذا لم تكن موجودة
}

</script>

<style>
.delayed {
  transition: 0.3s;
}

body {
  font-family: Tajawal, sans-serif;
  font-weight: 500;
}

.v-data-table {
  color: black !important;
}

.p-datatable-tbody>tr>td {
  white-space: nowrap !important;
}

.p-datatable .p-datatable-thead>tr>th {
  white-space: nowrap !important;
  text-align: center !important;  

}
.p-datatable-column-header-content{
  justify-content: center !important;
}
.dark .v-data-table {
  background-color: white;
  color: white;
}

.p-datatable-header {
  background-color: #fcf9f9 !important;
}

.dark .p-datatable-header {
  background-color: #5c5858 !important;
}

/* تغيير لون خلفية الصفوف */
.p-datatable .p-datatable-tbody>tr:nth-child(odd) {
  background-color: #c8e6ca ;
  /* لون خلفية الصفوف الفردية */
}

.dark .p-datatable .p-datatable-tbody>tr:nth-child(odd) {
  background-color: #5c5858;
  /* لون خلفية الصفوف الفردية */
  color: white;
}

.p-datatable .p-datatable-tbody>tr:nth-child(odd) {
  color: black;
}

.p-datatable .p-datatable-tbody>tr:nth-child(even) {
  color: black;
}

.p-iconfield .p-inputtext:not(:first-child) {
  background-color: white;
}

.p-datatable .p-datatable-tbody>tr:nth-child(even) {
  background-color: #f8f5f5;
  /* لون خلفية الصفوف الزوجية */
}

.dark .p-datatable .p-datatable-tbody>tr:nth-child(even) {
  background-color: #3a3838;
  /* لون خلفية الصفوف الزوجية */
  color: white;
}

/* تغيير لون خلفية رأس الجدول */
.p-datatable .p-datatable-thead>tr>th {
  background-color: #7733bc;
  /* لون خلفية رأس الجدول */
  color: #ffffff;
  /* لون النص في رأس الجدول */

}

/* تغيير لون الحدود */
.p-datatable .p-datatable-tbody>tr>td {
  border-color: #7733bc;
  /* لون حدود الخلايا */
}

.p-multiselect-label:has(.p-chip) {
  display: flex !important;
  flex-wrap: wrap !important;

}

.p-multiselect-label {
  display: flex !important;
  flex-wrap: wrap !important;
  white-space: pre-wrap !important;
}

.p-paginator {
  background-color: #7733bc !important;
}

.p-paginator-prev {
  color: white !important;
  cursor: pointer !important;
}

.p-paginator-first {
  color: white !important;
  cursor: pointer !important;
}

.p-paginator-next {
  color: white !important;
  cursor: pointer !important;
}

.p-paginator-last {
  color: white !important;
  cursor: pointer !important;
}

.p-datatable-inline-filter {
  display: flex !important;
  gap: 2px !important;
  justify-content: start !important;
  align-items: start !important;
}

td {
  border-right: 1px solid #7733bc !important;
  /* إضافة خط عمودي */
}

.p-datatable-header-cell {
  border-right: 1px solid #ddd !important;
  /* إضافة خط عمودي */
}
</style>