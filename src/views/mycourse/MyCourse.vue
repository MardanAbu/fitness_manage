<template>
  <el-main>
    <!-- 表格 -->
    <el-table :height="tableHeight" :data="tableDate.list" border stripe>
      <el-table-column prop="image" width="90" label="Course Cover" align="center">
        <template #default="scope">
          <el-image style="width: 60px; height: 60px; border-radius: 50%" :src="scope.row.image"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="courseName" label="Course name"></el-table-column>
      <el-table-column prop="courseHour" label="Hours"></el-table-column>
      <el-table-column prop="coursePrice" label="Price"></el-table-column>
      <el-table-column prop="teacherName" label="Tutor"></el-table-column>
    </el-table>

    <!-- Paging -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>
  </el-main>
</template>
  
<script setup lang="ts">
import useMyCourseTable from "../../composables/mycourse/useMyCourseTable";

//列表
const {
  listParm,
  tableDate,
  sizeChange,
  currentChange,
  tableHeight,
} = useMyCourseTable();

</script>
  
<style scoped></style>