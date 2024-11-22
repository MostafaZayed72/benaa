<template>
    <div>
        <h1>طلبات الشراء</h1>
        <div class="table-wrapper">
            <DataTable :value="orders" responsiveLayout="scroll" class="mx-auto px-2 md:px-10 rounded">
                <Column field="productName" header="اسم المنتج"></Column>
                <Column field="orderNumber" header="رقم الطلب"></Column>
                <Column field="orderDate" header="تاريخ الطلب"></Column>
                <Column field="amount" header="المبلغ"></Column>
            </DataTable>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

// بيانات ثابتة
const orders = ref([
    {
        productName: 'هاتف ذكي',
        orderNumber: '12345',
        orderDate: '2023-11-20',
        amount: '1500 ريال'
    },
    {
        productName: 'لابتوب',
        orderNumber: '12346',
        orderDate: '2023-11-21',
        amount: '3500 ريال'
    },
    {
        productName: 'سماعات',
        orderNumber: '12347',
        orderDate: '2023-11-22',
        amount: '500 ريال'
    }
])
</script>

<style>
h1 {
    text-align: center;
    margin-bottom: 20px;
}

.p-datatable-tbody>tr>td {
    white-space: nowrap !important;
}

/* حاوية الجدول لجعل التمرير الأفقي ممكن */
.table-wrapper {
    overflow-x: auto;
    /* تمكين التمرير الأفقي */
    max-width: 100%;
    /* جعل الجدول يأخذ المساحة الكاملة */
}

/* التأكد من أن النص لا يلتف داخل الخلايا */
.p-datatable td {
    white-space: nowrap;
    /* منع التفاف النص */
    text-overflow: ellipsis;
    /* إضافة النقاط الثلاث إذا كان النص طويلاً جدًا */
    overflow: hidden;
}

/* تعديل عرض الجدول ليأخذ المساحة الكاملة */
.p-datatable {
    table-layout: auto;
    /* تمكين الجدول من التكيف مع محتواه */
    width: 100%;
    /* يجعل الجدول يأخذ المساحة الكاملة */
}

/* تحسين حجم الأعمدة لتتناسب مع المحتوى */
.p-datatable th,
.p-datatable td {
    padding: 10px;
    text-align: center;
}

.p-datatable th {
    font-weight: bold;
}
</style>