<template>
    <el-main>
        <!-- searching bar -->
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.courseName" placeholder="Course name"></el-input>
            </el-form-item>

            <el-form-item>
                <el-input v-model="listParm.teacherName" placeholder="Coach"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button :icon="Search" @click="searchBtn">Search</el-button>
                <el-button :icon="Close" type="danger" @click="resetBtn">Reset</el-button>
                <el-button :icon="Plus" v-permission="['sys:courseList:add']" type="primary" @click="addBtn">Add</el-button>
            </el-form-item>
        </el-form>

        <!-- table -->
        <el-table :data="tableData.list" :height="tableHeight" border stripe>
            <el-table-column prop="image" width="80" label="Course Image" align="center">
                <template #default="scope">
                    <el-image style="width: 50px; height: 50px; border-radius: 50%" :src='scope.row.image'></el-image>
                </template>
            </el-table-column>
            <el-table-column prop="courseName" label="Course Name"></el-table-column>
            <el-table-column prop="courseHour" label="Hours"></el-table-column>
            <el-table-column prop="coursePrice" label="Price"></el-table-column>
            <el-table-column prop="teacherName" label="Coach"></el-table-column>
            <el-table-column label="Action" align="center" width="220">
                <template #default="scope">
                    <el-button type="primary" v-permission="['sys:courseList:edit']" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
                    <el-button type="danger" v-permission="['sys:courseList:delete']" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
                    <el-button type="success" v-permission="['sys:courseList:join']" :icon="Edit" size="default" @click="joinBtn(scope.row)">Register</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- Paging -->
        <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
            :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="listParm.total" background>
        </el-pagination>

        <!-- Create,edit -->
        <AddCourse ref="addRef" @reFresh="reFresh"></AddCourse>
    </el-main>
</template>

<script setup lang="ts">
import AddCourse from './AddCourse.vue';
import useTable from '@/composables/course/useTable';
import useCurse from '@/composables/course/useCourse';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';

//List
const { listParm,
    tableData,
    getList,
    sizeChange,
    currentChange,
    tableHeight,
    searchBtn,
    resetBtn,
    reFresh } = useTable()

//Craete,edit
const { addBtn, editBtn, deleteBtn, addRef, joinBtn } = useCurse(getList)

</script>

<style scoped></style>