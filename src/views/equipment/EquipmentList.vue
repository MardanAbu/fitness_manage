<template>
  <el-main>
    <!-- Searching bar -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input v-model="listParm.name" placeholder="Enter equipment name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">Search</el-button>
        <el-button :icon="Close" type="danger" plain @click="resetBtn">Reset</el-button>
        <el-button :icon="Plus" type="primary" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <el-table :height="tableHeight" :data="tableData.list" border stripe>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="numTotal" label="Sum"></el-table-column>
      <el-table-column label="Action" align="center" width="220">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" size="default" @click="etidBtn(scope.row)">Edit</el-button>
          <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

     <!-- Paging -->
     <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10,20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>

    <!-- Create edit -->
    <AddEquipment ref="addRef" @reFresh="reFresh"></AddEquipment>
  </el-main>
</template>
  
<script setup lang="ts">
import AddEquipment from "./AddEquipment.vue";
import { Plus, Edit, Delete, Search, Close } from "@element-plus/icons-vue";
import useTable from "@/composables/equipment/useTable";
import useEquipment from "@/composables/equipment/useEquipment"
//table
const { listParm ,searchBtn,resetBtn,tableData,sizeChange,currentChange,tableHeight,reFresh, getList } = useTable();

const { addBtn, etidBtn, deleteBtn, addRef } = useEquipment(getList)
</script>
  
<style scoped></style>