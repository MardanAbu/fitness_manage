<template>
  <el-main>
    <!-- searching bar -->
    <el-form :model="listParm" :inline="true" size="default">
      <el-form-item>
        <el-input v-model="listParm.title" placeholder="Please enter the title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button :icon="Search" @click="searchBtn">Search</el-button>
        <el-button :icon="Close" type="danger" plain @click="resetBtn">Reset</el-button>
        <el-button :icon="Plus" type="primary" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <!-- Table -->
    <el-table :data="tableList.list" :height="tableHeight" border stripe>
      <el-table-column prop="title" label="Title"></el-table-column>

      <el-table-column prop="cardType" label="Type">
        <template #default="scope">
        <el-tag v-if="scope.row.cardType == '1'"  size="default">One time</el-tag>
        <el-tag v-if="scope.row.cardType == '2'" type="success" size="default">Weekly</el-tag>
        <el-tag v-if="scope.row.cardType == '3'" type="danger" size="default">Monthly</el-tag>
        <el-tag v-if="scope.row.cardType == '4'" type="danger" size="default">Annually</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="cardDay" label="Day"></el-table-column>
      <el-table-column prop="price" label="Price($)"></el-table-column>
      <el-table-column prop="status" label="Status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '1'" type="success" size="default">Enable</el-tag>
          <el-tag v-if="scope.row.status == '0'" type="danger" size="default">Disable</el-tag>          
        </template>
      </el-table-column>

      <el-table-column label="Action" align="center" width="220">
        <template #default="scope">
          <el-button type="primary" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
          <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
      :pager-count="7">
    </el-pagination>
    


    <!-- Create, Edit -->
    <AddCard ref="addRef" @refresh="refresh"></AddCard>

  </el-main>
</template>
<script setup lang="ts">

import AddCard from './AddCard.vue';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
import useMemberTable from '@/composables/member_card/useMemberTable';
import useMember from '@/composables/member_card/useMember';

//table's actions
const { listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, tableHeight, refresh} = useMemberTable()
//create, edit, delete
const { addBtn, editBtn, deleteBtn, addRef } = useMember(getList);
</script>
<style scoped ></style>