<template>
    <el-dropdown>
      <span class="el-dropdown-link">
        <img class="userimg" src="@/assets/user.png" />
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="loginOut">Log out</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </template>
  
  <script setup lang="ts">
  import useInstance from "@/hooks/useInstance";
  import { userStore } from "@/store/user";
  const { global } = useInstance();
  const store = userStore();
  const loginOut = async () => {
    const confirm = await global.$myconfirm("Do you want to logout?");
    if (confirm) {
      //清空用户信息
      store.setToken("");
      store.setUserId("");
      store.setUserType("");
      window.location.href = "/login";
    }
  };
  </script>
  
  <style scoped>
  .userimg {
    height: 38px;
    width: 38px;
    border-radius: 50%;
  }
  </style>
  