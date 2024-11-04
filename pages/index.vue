<template>
    <div class="relative w-full mt-28 md:mt-0">
        <!-- الفيديو -->
        <img src="/public/imgs/logo.png" alt="Logo" class="w-[50%] mx-auto">        
        <!-- شعار المنصة وقسم الدعم الفني للشاشات الكبيرة -->
        <div class="hidden sm:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
            <img src="/public/imgs/logo.png" alt="Logo" class="w-[50%] mx-auto">
            <h1 class="text-8xl text-white mt-2">منصة بناء</h1>
        </div>
        
        <div class="hidden sm:flex absolute bottom-4 left-4 flex-col items-center text-white px-16 py-2" style="border: 1px solid white">
            <Icon name="fa6-solid:headphones" class="text-5xl"/>
            <h1 class="mt-2 text-3xl">الدعم الفني</h1>
        </div>

        <!-- شعار المنصة وقسم الدعم الفني للشاشات الصغيرة -->
        <div class="sm:hidden text-center mt-4">
            <img src="/public/imgs/logo.png" alt="Logo" class="w-[70%] mx-auto">
            <h1 class="text-4xl text-white mt-2">منصة بناء</h1>

            <div class="flex flex-col items-center text-white mt-4 border border-white px-6 py-2 w-[50%] mx-auto md:w-full md:mx-0">
                <Icon name="fa6-solid:headphones" class="text-2xl"/>
                <h1 class="mt-2 text-xl">الدعم الفني</h1>
            </div>
        </div>
    </div>
</template>
