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
        <el-button :icon="Plus" v-permission="['sys:memberList:add']" type="primary" @click="addBtn">Create</el-button>
      </el-form-item>
    </el-form>

    <!-- Table -->
    <el-table :height="tableHeight" :data="tableList.list" border stripe>
      <el-table-column prop="username" label="ID"></el-table-column>
      <el-table-column prop="name" label="Name"></el-table-column>
      <el-table-column prop="cardType" label="Membership"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="money" label="Blance"></el-table-column>
      <el-table-column
        prop="endTime"
        width="150"
        label="Expire date"
      ></el-table-column>
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
      <el-table-column prop="status" label="Status">
        <template #default="scope">
          <el-tag v-if="scope.row.status == '1'" type="success" size="default">Active</el-tag>
          <el-tag v-if="scope.row.status == '0'" type="danger" size="default">Passive</el-tag>
        </template>
      </el-table-column>

      <!-- v-if="global.$checkPermission(['sys:memberList:purchase','sys:memberList:edit','sys:memberList:delete'])" -->

      <el-table-column label="Action" width="220" align="center">
        <template #default="scope">
          <el-button type="success"  :icon="Edit" size="default" @click="joinBtn(scope.row)">Purchase</el-button>
          <!-- v-if="global.$checkPermission(['sys:memberList:purchase'])" -->
          <el-button type="primary">
            <el-dropdown>
              <span class="el-dropdown-link" style="color:#FFF">
                More
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :icon="ChatLineSquare" @click="rechargeBtn(scope.row)">Recharge</el-dropdown-item>
                  <el-dropdown-item :icon="Edit" @click="editBtn(scope.row)">Edit</el-dropdown-item>
                  <el-dropdown-item type="danger" :icon="Delete" @click="deleteBtn(scope.row)">Delete</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- paging -->
    <el-pagination @size-change="sizeChange" @current-change="currentChange" :current-page.sync="listParm.currentPage"
      :page-sizes="[10, 20, 40, 80, 100]" :page-size="listParm.pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="listParm.total" background>
    </el-pagination>


    <!-- Create,edit -->
    <AddMember ref="addRef" @refresh="refresh"></AddMember>
    <!-- Membership dialog -->
    <JoinApply ref="joinRef" @refresh="refresh"></JoinApply>
    <!-- Recharge dialog -->
    <Recharge ref="rechargeRef" @refresh="refresh"></Recharge>
  </el-main>
</template>

<script setup lang="ts">
import AddMember from "./AddMember.vue";
import useTable from "@/composables/member/useTable";
import { Search, Edit, Plus, Close, Delete, ChatLineSquare } from '@element-plus/icons-vue';
import useMember from "@/composables/member/useMember";
import JoinApply from "./JoinApply.vue";
import useJoin from "@/composables/member/useJoin";
import useRecharge from "@/composables/member/useRecharge";
import Recharge from "./Recharge.vue";
import useInstance from "@/hooks/useInstance";
import { ref } from "vue";

const { global } = useInstance()

//表哥相关
const { listParm, getList, searchBtn, resetBtn, tableList, sizeChange, currentChange, refresh, tableHeight } = useTable()

//Create, Edit
const { addBtn, editBtn, deleteBtn, addRef } = useMember(getList)

//memberiship purchase
const { joinRef, joinBtn } = useJoin()

//Recharge
const { rechargeRef, rechargeBtn } = useRecharge();

//按钮的初始值
// const rechargeFlg = ref(false);
// const editFlag = ref(false);
// const deleteFlg = ref(false);
// const vChange = ()=>{
//   editFlag.value = global.$checkPermission(['sys:memberList:edit'])
//   deleteFlg.value = global.$checkPermission(['sys:memberList:delete'])
//   rechargeFlg.value = global.$checkPermission(['sys:memberList:purchase'])

// }
</script>
<style scoped ></style>