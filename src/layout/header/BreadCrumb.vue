<template>
    <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item v-for="item in tabs">{{ item.meta.title }}</el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">
import { Ref, watch, ref } from 'vue';
import { useRoute, RouteLocationMatched} from 'vue-router';
//get current router
const route = useRoute();
//breadcrumb data, Ref definde the type of data
const tabs:Ref<RouteLocationMatched[]> = ref([])

//action after router change
const getBredcrumb = ()=>{
    //find menu include title
    let mached = route.matched.filter((item)=>item.meta && item.meta.title)
    console.log(mached)
    //estimate if the first one is home, if not build a home
    const first = mached[0]
    if(first.path !== '/dashboard'){
        //build home, and put it in mached
        mached = [{path:'/dashboard', meta:{title:'Home'}} as any].concat(mached)
    }
    //set it in breadcrumb
    tabs.value = mached;
};
getBredcrumb()

//monitor changing of router
watch(
    ()=>route.path,
    ()=>getBredcrumb()
)
</script>

<style scoped>
:deep(.el-breadcrumb__inner){
    color: #fff !important;
}
:deep(.el-breadcrumb__inner a){
    color: #fff !important;
}

:deep(.el-breadcrumb__item){
    font-size: 14px;
}
.bread{
    margin-left: 20px;
}
</style>