<template>
  <el-main>
    <!-- searching bar -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input placeholder="Enter the name" v-model="listParm.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">Search</el-button>
        <el-button @click="resetBtn" plain :icon="Close" type="danger">Reset</el-button>
        <el-button type="primary" :icon="Plus" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :height="tableHeight" :data="tableList.list" border stripe>
      <el-table-column prop="roleName" label="roleName"></el-table-column>
      <el-table-column prop="remark" label="remark"></el-table-column>
      <el-table-column label="action" width="220" align="center">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
          <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- paging -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>

    <!-- Create,edit dialog -->
    <role-add ref="addRef" @refresh="refresh">

    </role-add>
  </el-main>
</template>

<script setup lang="ts">
import RoleAdd from './RoleAdd.vue';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
import useTable from "@/composables/role/useTable";
import useRole from "@/composables/role/useRole";

//table control
const { searchBtn, resetBtn, getList, listParm, tableList, sizeChange, currentChange, tableHeight, refresh } = useTable();
//create, edit, delete
const { addBtn, editBtn, deleteBtn, addRef } = useRole(getList);
</script>

<style scoped></style>