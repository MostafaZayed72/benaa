<template>
    <footer class=" text-white bg-violet-700" style="background-color: #7733bc;">
        <div class="container mx-auto flex flex-col-reverse gap-2 md:flex-row flex-wrap justify-between items-center">
            <!-- شعار الموقع -->
            <div class="flex items-center space-x-3">
                <img src="/imgs/logo.png" alt="Site Logo" class="h-12 w-12 mx-2 rounded-full" />
                <span class="text-sm md:text-xl">
                    &copy; {{ new Date().getFullYear() }} {{ $t('All rights reserved to Munira.') }}
                </span>
            </div>
            <h1 >
                    {{ $t('Mail Us') }} : <a href="mailto:support@example.com" class="underline text-green-300 hover:text-green-400 delayed">Munira@gmail.com</a>
            </h1>
            <!-- الروابط -->
            <nav class="flex space-x-6 md:text-xl">
                
                <nuxt-link to="/contact" class="hover:underline hover:text-green-300 mx-6 delayed">
                    {{ $t('Contact Us') }}
                </nuxt-link>
                <nuxt-link to="/about" class="hover:underline hover:text-green-300 delayed">
                    {{ $t('About Us') }}
                </nuxt-link>
                <nuxt-link to="/products" class="hover:underline hover:text-green-300 delayed">
                    {{ $t('Products') }}
                </nuxt-link>
                
            </nav>
        </div>
    </footer>
</template>

<script setup>
</script>

<style scoped></style>