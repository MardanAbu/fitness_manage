<template>
    <el-main>

        <!-- Searching bar -->
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.lostName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">Search</el-button>
                <el-button type="danger" plain :icon="Close" @click="resetBtn">Reset</el-button>
                <el-button :icon="Plus" type="primary" @click="addBtn">Add</el-button>
            </el-form-item>
        </el-form>

        <!-- Table -->
        <el-table :height="tableHeight" :data="tableData.list" border stripe>
            <el-table-column prop="lostName" label="Item name"></el-table-column>
            <el-table-column width="120" prop="foundPerson" label="Found person"></el-table-column>
            <el-table-column width="110" prop="foundAddress" label="Found place"></el-table-column>
            <el-table-column prop="foundTime" label="Found time"></el-table-column>
            <el-table-column prop="foundPhone" label="Phone"></el-table-column>
            <el-table-column prop="lostPerson" label="Claimed by"></el-table-column>
            <el-table-column prop="status" label="Status">
                <template #default="scope">
                    <el-tag v-if="scope.row.status == '1'" type="success" size="default">Returned</el-tag>
                    <el-tag v-if="scope.row.status == '0'" type="danger" size="default">Not returned</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="Actions" align="center" width="350">
                <template #default="scope">
                    <el-button type="primary" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
                    <el-button type="danger" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
                    <el-button type="success" :icon="Edit" size="default" @click="lostBtn(scope.row)">Returned</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Paging -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
            :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background>
        </el-pagination>

        <!-- Add,edit -->
        <AddLost ref="addRef" @refresh="reFresh"></AddLost>

        <!-- Return dialog -->
        <LostPerson ref="lostPersonRef" @reFresh="reFresh"></LostPerson>
    </el-main>
</template>
  
<script setup lang="ts">
import AddLost from "./AddLost.vue";
import useLost from "@/composables/lost/useLost";
import { Plus, Edit, Delete, Search, Close } from "@element-plus/icons-vue";
import useTable from "@/composables/lost/useTable";
import LostPerson from "./LostPerson.vue";

const { listParm, searchBtn, resetBtn, tableData, getList, sizeChange, currentChange, tableHeight, reFresh } = useTable();

const { addBtn, editBtn, deleteBtn, addRef, lostBtn, lostPersonRef } = useLost(getList);
</script>
  
<style scoped></style>