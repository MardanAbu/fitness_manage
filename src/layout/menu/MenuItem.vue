<template>
    <template v-for="menu in menuList" :key="menu.path">
        <!-- check if the current menu has submenus and if the submenus contains data. -->
        <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path">
            <template #title>
                <el-icon>
                    <!-- using dynamic components to disply icons -->
                    <component :is="menu.meta.icon"></component>
                </el-icon>
                <span>{{ menu.meta.title }}</span>
            </template>

            <menu-item :menuList="menu.children"></menu-item>
        </el-sub-menu>
        <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
            <el-icon>
                <!-- using dynamic components to disply icons -->
                <component :is="menu.meta.icon"></component>
            </el-icon>
            <template #title>{{ menu.meta.title }}</template>
        </el-menu-item>
    </template>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
//child component get passed data from parent component
defineProps(['menuList'])
</script>
<style scoped lang='scss'></style>