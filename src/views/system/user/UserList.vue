<template>
    <el-main>
      <!-- seaching bar -->
      <el-form :model="listParm" :inline="true" size="default">
        <el-form-item>
          <el-input v-model="listParm.phone" placeholder="Please enter phone number"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="listParm.name" placeholder="Please enter the name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="searchBtn" :icon="Search">Search</el-button>
          <el-button @click="resetBtn" type="danger" plain :icon="Close">Reset</el-button>
          <el-button type="primary" @click="addBtn" :icon="Plus">Create</el-button>
        </el-form-item>
      </el-form>

      <!-- Table -->
      <el-table :height="tableHeight" :data="tableList.list" border stripe>
        <el-table-column prop="name" label="Name"></el-table-column>
        <el-table-column prop="sex" label="Gender">
        <template #default="scope">
          <el-tag v-if="scope.row.sex == '0'" type="success" size="default">Male</el-tag>
          <el-tag v-if="scope.row.sex == '1'" type="danger" size="default">Female</el-tag>          
        </template>
      </el-table-column>
        <el-table-column prop="phone" label="Phone"></el-table-column>
        <el-table-column prop="email" label="Email"></el-table-column>
        <el-table-column prop="userType" label="Type">
        <template #default="scope">
          <el-tag v-if="scope.row.userType == '1'" type="success" size="default">Employee</el-tag>
          <el-tag v-if="scope.row.userType == '2'" type="danger" size="default">Coach</el-tag>          
        </template>
      </el-table-column>
      <el-table-column prop="salary" label="Salary"></el-table-column>

      <el-table-column prop="status" label="Status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '1'" type="success" size="default">Enable</el-tag>
          <el-tag v-if="scope.row.status == '0'" type="danger" size="default">Disable</el-tag>          
        </template>
      </el-table-column>

      <el-table-column label="" align="center" width="220">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
          <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>          
        </template>
      </el-table-column>
      </el-table>

      <!-- paging -->
      <el-pagination
        @size-change="sizeChange"
        @current-change="currentChange"
        :current-page.sync="listParm.currentPage"
        :page-sizes="[10, 20, 40, 100]"
        :page-size="listParm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listParm.total" background>
        :pager-count="7">
      </el-pagination>
      
      
      <!-- Create, Edit dialgo -->
      <add-user ref="addRef" @refresh="refresh"></add-user>
      
    </el-main>
  </template>

  <script setup lang="ts">
  import AddUser from './AddUser.vue';
  import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
  import useTable from '@/composables/user/useTable';
  import userUser from '@/composables/user/useUser';
  //Table
  const {listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, tableHeight, refresh} = useTable();
  //Create, edit
  const { addBtn, editBtn, deleteBtn, addRef } = userUser(getList);
  </script>
  <style scoped >
  </style>