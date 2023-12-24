<template>
     <el-container class="layout">
      <el-aside width="auto" class="asside">
        <menu-bar></menu-bar>
      </el-aside>
      <el-container>
        <el-header width="300px" class="header">
          <Header></Header>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>

<script setup lang="ts">
import Header from '@/layout/header/Header.vue'
import MenuBar from '@/layout/menu/MenuBar.vue'
import { ref ,reactive} from 'vue'
</script>
<style lang="scss">
.layout {
  height: 100%;
  width: 100%;
  .asside {
    // background-color: blueviolet;
    background-color: #304156;
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #009688;
    width: 100%;
  }
  .main {
    width: 100%;
  }
}
</style>