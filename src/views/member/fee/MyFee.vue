<template>
  <el-main>
    <el-table :height="tableHeight" :data="tableData.list" border stripe>
      <el-table-column label="Username" prop="username"></el-table-column>
      <el-table-column label="Name" prop="name"></el-table-column>
      <el-table-column label="Amount" prop="money"></el-table-column>
      <el-table-column label="Charged time" prop="createTime"></el-table-column>
      <el-table-column label="Charged by" prop="createUser"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]"
      :page-size="listParm.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total"
      background
    >
    </el-pagination>
  </el-main>
</template>

<script setup lang="ts">
import { MemberRecharge } from "@/api/member/MemberModel";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getMyRechargeApi } from "@/api/member";
import { userStore } from "@/store/user";

const tableHeight = ref(0);
const store = userStore();

const listParm = reactive<MemberRecharge>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  memberId: "",
  userType: "",
});

//表格数据
const tableData = reactive({
  list: [],
});

//查询表格数据
const getList = async () => {
  listParm.memberId = store.getUserId;
  listParm.userType = store.getUserType;
  let res = await getMyRechargeApi(listParm);
  if (res && res.code == 200) {
    console.log(res);
    tableData.list = res.data.records;
    listParm.total = res.data.total;
  }
};

//页容量改变时触发
const sizeChange = (size: number) => {
  listParm.pageSize = size;
  getList();
};
//页数改变时触发
const currentChange = (page: number) => {
  listParm.currentPage = page;
  getList();
};
onMounted(() => {
  nextTick(() => {
    tableHeight.value = window.innerHeight - 230;
  });
  getList();
});
</script>

<style scoped></style>