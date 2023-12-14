<template>
  <el-main>
    <!-- Seaching bar -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input v-model="listParm.name" placeholder="Enter the name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listParm.phone" placeholder="Enter the phone number"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="listParm.username" placeholder="Enter the ID"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">Search</el-button>
        <el-button :icon="Close" type="danger" plain @click="resetBtn">Reset</el-button>
        <el-button :icon="Plus" type="primary" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <!-- Table -->
    <el-table :height="tableHeight" :data="tableList.list" border stripe>
      <el-table-column prop="username" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="sex" label="Gender">
        <template #default="scope">
          <el-tag v-if="scope.row.sex == '0'" type="success" size="default">Male</el-tag>
          <el-tag v-if="scope.row.sex == '1'" type="danger" size="default">Female</el-tag>          
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="Phone"></el-table-column>      
      <el-table-column prop="age" label="Age"></el-table-column>
      <el-table-column prop="birthDay" label="Birthday"></el-table-column>
      <el-table-column prop="joinTime" label="Join Date"></el-table-column>
      <el-table-column prop="height" label="Height"></el-table-column>
      <el-table-column prop="weight" label="Weight"></el-table-column>
      <el-table-column prop="status" label="Status">
        <template #default="scope">
            <el-tag v-if="scope.row.status == '1'" type="success" size="default">Active</el-tag>
            <el-tag v-if="scope.row.status == '0'" type="danger" size="default">Passive</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Action" width="220" align="center">
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
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>
    

    <!-- Create,edit -->
    <AddMember ref="addRef" @refresh="refresh"></AddMember>
    
  </el-main>
  
</template>
<script setup lang="ts">
import AddMember from "./AddMember.vue";
import useTable from "@/composables/member/useTable";
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
import useMember from "@/composables/member/useMember";

//表哥相关
const { listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, refresh, tableHeight } = useTable()

//Create, Edit
const { addBtn, editBtn, deleteBtn, addRef } = useMember(getList)
</script>
<style scoped ></style>