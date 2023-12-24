<template>
  <div class="logincontainer">
    <el-form class="loginForm" :model="loginModel" ref="loginForm" :rules="rules" size="default">
      <el-form-item style="display: flex; justify-content: center">
        <div class="loginTitle">Login</div>
      </el-form-item>
      <el-form-item>
        <el-input size="large" v-model="loginModel.username" prop="username" placeholder="Enter Username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" size="large" v-model="loginModel.password" prop="password" placeholder="Enter password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="20">
          <el-col :span="16" :offset="0">
            <el-input size="large" v-model="loginModel.code" prop="code" placeholder="Enter code"></el-input>
          </el-col>
          <el-col :span="8" :offset="0">
            <img :src="imgSrc" class="image" @click="getImage" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="User type">
        <el-radio-group v-model="loginModel.userType" prop="suerType">
          <el-radio :label="1">Member</el-radio>
          <el-radio :label="2">Employee</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-row style="width:100%;">
          <el-col :span="12" :offset="0" style="padding-right: 10px; padding-left: 0px">
            <el-button style="width:100%;" size="large" type="primary" @click="onSubmit">Login</el-button>
          </el-col>
          <el-col :span="12" :offset="0" style="padding-right: 0px; padding-left: 10px">
            <el-button type="danger" plain style="width:100%;" size="large">Reset</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script setup lang="ts">
import { reactive, ref } from "vue";
import useImage from "@/composables/login/useImage";
import { loginApi } from "@/api/login/index"
import { FormInstance } from "element-plus";
import { userStore } from "@/store/user";
import { useRouter } from "vue-router";

const store = userStore();

const router = useRouter();

const loginRef = ref<FormInstance>();

const { imgSrc, getImage } = useImage()

//表单对象
const loginModel = reactive({
  username: "",
  password: "",
  code: "",
  userType: ''
});

//表单验证规则
const rules = reactive({
  username: [
    {
      required: true,
      trigger: "blur",
      message: "Enter a username",
    },
  ],
  password: [
    {
      required: true,
      trigger: "blur",
      message: "Enter password",
    },
  ],
  code: [
    {
      required: true,
      trigger: "blur",
      message: "Enter the code",
    },
  ],
  userType: [
    {
      required: true,
      trigger: "blur",
      message: "Choose a usertype",
    },
  ],
});

//登录提交
const onSubmit = async () => {
    const res = await loginApi(loginModel)
      if(res && res.code == 200){
        // save userid and token
        store.setToken(res.data.token);
        store.setUserId(res.data.userId);
        store.setUserType(res.data.userType)

        router.push({path:"/"});
      }
    };
</script>
  
<style scoped lang="scss">
.logincontainer {
  background-color: #ffff;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("../../assets/login_bg.jpg");
  background-size: 100% 100%;

  .loginForm {
    border-radius: 10px;
    background-color: #fff;
    width: 430px;
    height: 340px;
    padding: 20px 35px;

    .loginTitle {
      color: #010000;
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .image {
      height: 40px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
}
</style>