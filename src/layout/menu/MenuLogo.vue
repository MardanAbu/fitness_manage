<template>
    <div class="logo">
        <img :src="MenuLogo" />
        <span v-if="!props.isCollapsed" class="logo-title">{{ title }}</span>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import MenuLogo from '@/assets/logo.png'
const title = ref('Fitness MIK')
//get from parent component
const props = defineProps({
    isCollapsed:{
        required:true,
        type:Boolean
    },
});

const show = ref(true);
watch(
  () => props.isCollapsed,
  (collapsed: boolean) => {
    if (!collapsed) {
      setTimeout(() => {
        show.value = !collapsed;
      }, 300);
    } else {
      show.value = !collapsed;
    }
  }
);
</script>

<style lang="scss" scoped>
.logo {
    display: flex;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color: #2b2f3a;
    cursor: pointer;
    align-items: center;

    img {
        width: 60px;
        height: 60px;
        margin-right: 12px;
        margin-left: 20px;
    }
    .logo-title {
        color: white;
        font-weight: 800;
        line-height: 60px;
        font-size: 20px;
        font-family: cursive;
    }
}
</style>