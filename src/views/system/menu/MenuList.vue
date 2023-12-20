<template>
  <el-main style="padding-top: 10px;">
    <!-- Create -->

    <el-button style="margin-bottom: 20px;" v-permission="['sys:menu:add']" type="primary" size="default" @click="addBtn">Create</el-button>

    <!-- Table data -->
    <el-table :height="tableHeight" :data="tableList.list" row-key="menuId" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      border default-expand-all stripe>
      <el-table-column width="150" prop="title" label="Menu"></el-table-column>
      <el-table-column prop="type" label="Type">
        <template #default="scope">
        <el-tag v-if="scope.row.type == '0'"  size="default">Catalogs</el-tag>
        <el-tag v-if="scope.row.type == '1'" type="success" size="default">Menu</el-tag>
        <el-tag v-if="scope.row.type == '2'" type="danger" size="default">Button</el-tag>

        </template>
      </el-table-column>
      <el-table-column width="60" prop="icon" label="Icon">
        <template #default="scope">
        <el-icon>
          <!-- 动态组件的方式显示图标 -->
          <component :is="scope.row.icon"></component>
        </el-icon>
        </template>
      </el-table-column>

      <el-table-column prop="name" label="Route name"></el-table-column>
      <el-table-column prop="path" label="Path"></el-table-column>
      <el-table-column prop="url" label="URL"></el-table-column>
      <el-table-column prop="code" label="Permission"></el-table-column>
      <el-table-column label="Action" width="220" align="center">
        <template #default="scope">
        <el-button type="success" v-permission="['sys:menu:edit']" :icon="Edit" size="default" @click="editBtn(scope.row)">Edit</el-button>
        <el-button type="danger" v-permission="['sys:menu:delete']" :icon="Delete" size="default" @click="deleteBtn(scope.row)">Delete</el-button>
        
        
        </template>
      </el-table-column>
    </el-table>

    <!-- Create,Add -->
    <add-menu ref="addRef" @refresh="refresh"></add-menu>
  </el-main>
</template>
<script setup lang="ts">
import AddMenu from './AddMenu.vue';
import { Search, Edit, Plus, Close, Delete } from '@element-plus/icons-vue';
import useMenu from "@/composables/menu/useMenu";
import useMenuTable from '@/composables/menu/useMenuTable';

//table data
const { tableList, getList, tableHeight, refresh } = useMenuTable()

//Add, Edit
const { addBtn, editBtn, deleteBtn, addRef } = useMenu(getList);
</script>
<style scoped ></style>