<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @onConfirm="commit" @onClose="onClose">
        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="140px" size="default">
                <el-form-item prop="name" label="Equipment Name">
                    <el-input v-model="addModel.name"></el-input>
                </el-form-item>
                <el-form-item prop="numTotal" label="Sum">
                    <el-input v-model="addModel.numTotal"></el-input>
                </el-form-item>
                <el-form-item prop="details" label="Details">
                    <el-input type="textarea" v-model="addModel.details" />
                </el-form-item>
            </el-form>
        </template>
    </SysDialog>
</template>
  
<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { EquipmentType } from "@/api/equipment/EquipmentModel";
import { nextTick, reactive, ref } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { addApi, editApi } from "@/api/equipment/index";
import { EditType, Title } from "@/type/BaseEnum";
import useInstance from "@/hooks/useInstance";

const { global } = useInstance();

//表单的ref属性
const addFormRef = ref<FormInstance>();

const { dialog, onClose, onConfirm, onShow } = useDialog();

//定义方法给外部使用
const show = (type: string, row?: EquipmentType) => {
    dialog.width = 700;

    type == EditType.ADD
        ? (dialog.title = Title.ADD)
        : (dialog.title = Title.EDIT);

    if (type == EditType.EDIT) {
        nextTick(() => {
            global.$objCopy(row, addModel);
        });
    }

    onShow();
    //清空表单
    addFormRef.value?.resetFields()
    addModel.type = type;
};
//暴露出去给外地调用
defineExpose({
    show,
});

const addModel = reactive<EquipmentType>({
    type: "",
    name: "",
    numTotal: 0,
    details: "",
    id: "",
});
const validateNum = (rule: any, value: any, callback: any) => {
    if (value === 0 || value < 0) {
        callback(new Error("Enter sum"));
    } else {
        callback();
    }
};

//Dialog validation
const rules = reactive({
    name: [
        {
            required: true,
            message: "Enter the name",
            trigger: "blur",
        },
    ],
    numTotal: [
        {
            required: true,
            validator: validateNum,
            trigger: "blur",
        },
    ],
});

const emits = defineEmits(['reFresh'])

//Commit
const commit = () => {
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if (addModel.type == EditType.ADD) {
                res = await addApi(addModel);
            } else {
                res = await editApi(addModel);
            }
            if (res && res.code == 200) {
                emits('reFresh')
                ElMessage.success(res.msg)
                onClose();
            }
        }
    });
};
</script>
  
<style scoped></style>