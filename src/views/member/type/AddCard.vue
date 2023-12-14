<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">
        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" size="default">
                <el-row>
                    <el-col :span="24" :offset="0">
                        <el-form-item prop="cardType" label="Type">
                            <el-radio-group v-model="addModel.cardType">
                                <el-radio :label="'1'">One-Time</el-radio>
                                <el-radio :label="'2'">Weekly</el-radio>
                                <el-radio :label="'3'">Monthly</el-radio>
                                <el-radio :label="'4'">Annualy</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="title" label="Title">
                            <el-input v-model="addModel.title"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12" :offset="0">
                        <el-form-item prop="cardDay" label="Days">
                            <el-input v-model="addModel.cardDay"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="price" label="Price">
                            <el-input v-model="addModel.price"></el-input>
                        </el-form-item>
                    </el-col>

                    <el-col :span="12" :offset="0">
                        <el-form-item prop="status" label="Status">
                            <el-radio-group v-model="addModel.status">
                                <el-radio :label="'0'">Disable</el-radio>
                                <el-radio :label="'1'">Enable</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                
            </el-form>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { nextTick, reactive, ref } from 'vue';
import { CardType } from '@/api/member_card/MemberModel'
import { addApi, editApi } from '@/api/member_card/index';
import { ElMessage, FormInstance } from 'element-plus';
import { EditType, Title } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';

const { global } = useInstance();
//表单ref验证
const addFormRef = ref<FormInstance>();

//dialog attributes
const { dialog, onClose, onConfirm, onShow } = useDialog();

//Show dialog
const show = (type:string, row?:CardType) => {
    dialog.height = 200;
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    if(type == EditType.EDIT){
        //copy the data from object to dialog
        nextTick(()=>{
            global.$objCopy(row, addModel);
        })
    }
    addModel.type = type;
    onShow()
}

//暴露出去，给父组件调用
defineExpose({
    show,
})

//dialog data
const addModel = reactive<CardType>({
    type: '',
    title: '',
    cardType: '',
    cardId: '',
    price: '',
    cardDay: 0,
    status: ''
});

//表单验证规则
const rules = reactive({
    title:[{
        required: true,
        message: 'Please enter the title',
        trigger: 'change'
    },],

    cardType:[{
        required: true,
        message: 'Please choose a membership type',
        trigger: 'change'
    },],

    price:[{
        required: true,
        message: 'Please enter the price',
        trigger: 'change'
    },],

    status:[{
        required: true,
        message: 'Please choose the status',
        trigger: 'change'
    },],

    cardDay:[{
        required: true,
        message: 'Please enter the day number',
        trigger: 'change'
    },],
});

//注册事件
const emits = defineEmits(['refresh'])

//dialog commit
const commit = ()=>{
    addFormRef.value?.validate(async (valid)=>{
        if(valid){
            let res = null
            if(addModel.type == EditType.ADD){
                res = await addApi(addModel)
            } else {
                res = await editApi(addModel)
            }
            if(res && res.code == 200){
                ElMessage.success(res.msg)
                emits('refresh')
                onClose();
            }
        }
    });
};
</script>

<style lang="scss" scoped></style>