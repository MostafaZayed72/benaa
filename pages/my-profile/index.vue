<template>
    <v-card>
        
        <v-tabs v-model="tab" align-tabs="center" bg-color="deep-purple-accent-4" stacked>
            
            <v-tab value="tab-1">
                <v-icon icon="mdi-phone"></v-icon>

                {{ $t('Personal Data') }}
            </v-tab>

            <v-tab value="tab-2">
                <v-icon icon="mdi-heart"></v-icon>

                {{ $t('My orders') }} </v-tab>


            </v-tabs>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="'tab-1'">
                    <ProfileData class="bg-green-lighten-4 h-screen pt-10 "  />
                    <!-- <img src="/public/22.png" class="fixed top-0  left-[-20px] z-1 md:w-[30%]" alt="">
    <img src="/public/11.png" class="fixed bottom-0  left-[-20px] z-1 md:w-[30%]" alt="">
    <img src="/public/33.png" class="fixed bottom-0  right-[-20px] z-1 w-[50%] md:w-[30%]" alt=""> -->
                </v-tabs-window-item>
                <v-tabs-window-item :value="'tab-2'">
                    <ProfileData class="bg-green-lighten-4 h-screen pt-10" />
                </v-tabs-window-item>
            </v-tabs-window>
    </v-card>
</template>
<script>
export default {
    data() {
        return {
            tab: null,
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        }
    },
}
</script>