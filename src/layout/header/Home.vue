<template>
    <div class="home-button">
        <el-button type="primary" icon="House" @click="goHome"></el-button>
    </div>
</template>
  
<script lang="ts">
import { useRouter } from 'vue-router';
import { House } from '@element-plus/icons-vue';


export default {
    setup() {
        const router = useRouter();

        const goHome = () => {
            router.push('/dashboard');
        };

        return {
            goHome,
        };
    },
};
</script>

<style scoped>
</style>
  