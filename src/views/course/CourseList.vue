<template>

    <el-main>
        <el-form :model="listParm" :inline="true" size="default">
            <el-form-item>
                <el-input v-model="listParm.courseName" placeholder="Course name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :icon="Search">Search</el-button>
                <el-button :icon="Close">Reset</el-button>
                <el-button :icon="Plus" type="primary" @click="onSubmit">Add</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script setup lang="ts">
import useTable from '@/composables/course/useTable';
import useCurse from '@/composables/course/useCourse';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';


//List
const { listParm } = useTable()

//Craete,edit
const { addBtn, editBtn, deleteBtn } = useCurse()

</script>

<style scoped>

</style>