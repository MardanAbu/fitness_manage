<template>
  <el-main :style="{ height: mianHeight + 'px' }">
    <!-- 数据统计 -->
    <el-row :gutter="20" type="flex" class="row-bg" justify="center" style="margin-bottom: 80px">
      <el-col :span="6">
        <div class="show-header" style="background: rgb(45, 183, 245)">
          <div class="show-num">{{ total.memberCount }}</div>
          <div class="bottom-text">Member</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header" style="background: rgb(237, 64, 20)">
          <div class="show-num">{{ total.userCount }}</div>
          <div class="bottom-text">Employee</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header" style="background-color: rgb(111, 187, 36);">
          <div class="show-num">{{ total.equipCount }}</div>
          <div class="bottom-text">Equiptment</div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="show-header" style="background: rgb(255, 153, 0)">
          <div class="show-num">{{num}}</div>
          <div class="bottom-text">Wroking out</div>
        </div>
      </el-col>
    </el-row>

    <div>
      <el-row :gutter="20">
        <el-col :span="12" v-if="type==1">
          <div v-if="isEnter">
            <el-button type="primary" @click="exitEvent">Exit</el-button>
          </div>
          <div v-else>
            <img :src="qrCodeDataUrl" alt="QR Code"/>
          </div>
        </el-col>
        <el-col :span="12">
          <el-button type="secondary" class="scan-button" @click="redirectToScan">Go to Scan</el-button>
        </el-col>
      </el-row>
    </div>

    <el-card class="box-card" style="margin-top: 30px">
      <div slot="header" class="clearfix">
        <span style="color: #000000; font-weight: 600; margin-bottom: 10px">FeedBack</span>
        <el-divider></el-divider>
      </div>

      <div v-for="item in suggestList" class="text item">
        <span style="font-weight: 600; font-size: 14px">{{ item.title }}</span><span
          style="margin-left: 30px; font-size: 14px">{{ item.content }}</span>
        <el-divider></el-divider>
      </div>
    </el-card>
  </el-main>
</template>

<script setup lang="ts">
import { getSuggestApi, getTotalApi } from "@/api/home/index"
import { onMounted, reactive, nextTick, ref } from "vue";
import QRCode from 'qrcode';
import { exit, getCode } from "@/api/history";
import { userStore } from "@/store/user";

const qrCodeDataUrl = ref('');
const num = ref(0)
const isEnter = ref(false)
const type = ref(1)
const store = userStore();
const mianHeight = ref(0);

//sum
const total = reactive({
  memberCount: 0,
  userCount: 0,
  equipCount: 0
})

const redirectToScan = () => {
  window.open('http://localhost:3000/scan', '_blank');
};

//获取总数
const getTotal = async () => {
  let res = await getTotalApi()
  if (res && res.code == 200) {
    total.memberCount = res.data.memberCount
    total.userCount = res.data.userCount
    total.equipCount = res.data.equipCount
  }
}

type Suggest = {
  id: string,
  title: string,
  content: string,
  dateTime: string
}

const suggestList = ref<Suggest[]>([])

//feedback
const suggest = async () => {
  let res = await getSuggestApi()
  if (res && res.code == 200) {
    suggestList.value = res.data;
  }
}

const exitEvent = () => {
    exit().then(()=>{
      window.location.reload()
    })
  }

onMounted(() => {
  type.value = store.getUserType
    getCode().then(async res => {
      num.value = res.data.count
      isEnter.value = res.data.isEnter
      try {
        const dataUrl = await QRCode.toDataURL(res.data.code);
        qrCodeDataUrl.value = dataUrl;
      } catch (error) {
        console.error('Failed to generate QR Code', error);
      }
    })
  getTotal();
  suggest();
  nextTick(() => {
    mianHeight.value = window.innerHeight - 90;
  });
});
</script>

<style lang="scss" scoped>
.bottom-text {
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  height: 25px;
  line-height: 25px;
  text-align: center;
  position: absolute;
  font-weight: 600;
}

.show-header {
  background: #00c0ef;
  color: #fff;
  height: 80px;
  border-radius: 5px;
  position: relative;
}

.show-num {
  font-size: 38px;
  font-weight: 600;
  padding: 5px;
}

.scan-button {
  margin-top: 40px;
}
</style>