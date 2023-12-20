<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">
        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" size="default">
                <el-form-item prop="money" label="Recharge amount">
                    <el-input type="number" v-model="addModel.money"></el-input>
                </el-form-item>
            </el-form>
        </template>
    </SysDialog>
</template>
  
<script setup lang="ts">
import { MemberType, Recharge } from "@/api/member/MemberModel";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { ElMessage, FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import { rechargeApi } from "@/api/member/index";
import { userStore } from "@/store/user";

const store = userStore()

const addFormRef = ref<FormInstance>();

//表单绑定值
const addModel = reactive<Recharge>({
    userId: "",
    memberId: "",
    money: 0,
});

const validMoney = (rule: any, value: any, callback: any) => {
    if (value <= 0) {
        callback(new Error("Amount cann't lower than 0"));
    } else {
        callback();
    }
};

//表单验证规则
const rules = reactive({
    money: [
        {
            required: true,
            trigger: "change",
            validator: validMoney,
        },
    ],
});

//Dialog prop
const { dialog, onClose, onConfirm, onShow } = useDialog();

//Show dialog
const show = (row: MemberType) => {
    dialog.title = "Recharge for [" + row.name + "]";
    dialog.height = 120
    addModel.memberId = row.memberId
    onShow();
    addFormRef.value?.resetFields();
};

//暴露出去
defineExpose({
    show,
});

//注册事件
const emits = defineEmits(['refresh'])

//Commit
const commit = () => {
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            addModel.userId = store.getUserId
            let res = await rechargeApi(addModel);
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                emits('refresh')
                onClose();
            }
        }
    });
};
</script>
  
<style scoped></style>