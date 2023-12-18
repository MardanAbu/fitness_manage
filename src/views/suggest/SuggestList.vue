<template>
    <el-main>

        <!-- Searching bar -->
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.title" placeholder="Enter the title"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">Search</el-button>
                <el-button :icon="Close" type="danger" plain @click="resetBtn">Reset</el-button>
                <el-button :icon="Plus" type="primary" @click="addBtn">Create</el-button>
            </el-form-item>
        </el-form>

        <!-- Table -->
        <el-table :height="tableHeight" :data="tableData.list" border stripe>
            <el-table-column prop="title" label="Title"></el-table-column>
            <el-table-column prop="content" label="Content"></el-table-column>
            <el-table-column label="Actions" align="center" width="250">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
                    <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Paging -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
            :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background>
        </el-pagination>

        <!-- Create, edit -->
        <AddSuggest ref="addRef" @reFresh="reFresh"></AddSuggest>
    </el-main>
</template>
  
<script setup lang="ts">
import AddSuggest from "./AddSuggest.vue";
import { Plus, Edit, Delete, Search, Close } from "@element-plus/icons-vue";
import useTable from "@/composables/suggest/usrTable";
import useSuggest from "@/composables/suggest/useSuggest";

//table
const { listParm ,searchBtn,resetBtn,getList,tableData,sizeChange,currentChange,tableHeight,reFresh } = useTable();

//Create edit
const { addBtn, editBtn, deleteBtn, addRef } = useSuggest(getList);
</script>
  
<style scoped></style>