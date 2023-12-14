

<template>
  <el-button type="primary" size="default" @click="addBtn">New</el-button>
  <el-icon>
    <Delete />
  </el-icon>
  <h3>pinia test</h3>
  <span>{{count}}</span>
</template>

<script setup lang="ts">
import {storeToRefs} from 'pinia';
import {testStore} from "@/store/test/index";
//get store
const store = testStore();
//get count
const { count } = storeToRefs(store);
//new
const addBtn = ()=>{
    store.count++;
}
</script>

<style scoped>

</style>
