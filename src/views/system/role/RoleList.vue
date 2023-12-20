<template>
  <el-main>
    <!-- searching bar -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input placeholder="Enter a rolename" v-model="listParm.roleName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="searchBtn" :icon="Search">Search</el-button>
        <el-button @click="resetBtn" plain :icon="Close" type="danger">Reset</el-button>
        <el-button type="primary" v-permission="['sys:role:add']" :icon="Plus" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <!-- table -->
    <el-table :height="tableHeight" :data="tableList.list" border stripe>
      <el-table-column prop="roleName" label="roleName"></el-table-column>
      <el-table-column prop="remark" label="remark"></el-table-column>
      <el-table-column label="action" width="220" align="center">
        <template #default="scope">
          <el-button type="primary" v-permission="['sys:role:edit']" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
          <el-button type="danger" v-permission="['sys:role:delete']" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
          <el-button type="text" v-permission="['sys:role:permissions']" :icon="Edit" size="default" @click="assignBtn(scope.row)">Permission</el-button>

        </template>
      </el-table-column>
    </el-table>
    <!-- paging -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>

    <!-- Create,edit dialog -->
    <role-add ref="addRef" @refresh="refresh"> </role-add>

    <!-- permission assignment -->
    <assign-role ref="assignRoleRef"></assign-role>

  </el-main>
</template>

<script setup lang="ts">
import RoleAdd from './RoleAdd.vue';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
import useTable from "@/composables/role/useTable";
import useRole from "@/composables/role/useRole";
import AssignRole from './AssignRole.vue';

//table control
const { searchBtn, resetBtn, getList, listParm, tableList, sizeChange, currentChange, tableHeight, refresh } = useTable();
//create, edit, delete
const { addBtn, editBtn, deleteBtn, addRef, assignRoleRef, assignBtn } = useRole(getList);
</script>

<style scoped></style>