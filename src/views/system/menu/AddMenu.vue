<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @OnClose="onClose" @onConfirm="commit">
        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" size="default">
                <el-form-item prop="type" label="Type" labelWidth="110">
                    <el-radio-group v-model="addModel.type">
                        <el-radio :label="'0'">Catalogs</el-radio>
                        <el-radio :label="'1'">Menu</el-radio>
                        <el-radio :label="'2'">Button</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Parent Menu" prop="parentName" labelWidth="110">
                            <el-input type="hidden" v-model="addModel.parentId"></el-input>
                            <el-input @click="selectOpen" readonly v-model="addModel.parentName"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Menu Name" prop="title" labelWidth="110">
                            <el-input v-model="addModel.title"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row v-if="addModel.type != '2'">
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Menu Icon" prop="icon" labelWidth="110">
                            <el-input v-model="addModel.icon"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Route Name" prop="name" labelWidth="110">
                            <el-input v-model="addModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Menu Order" prop="orderNum" labelWidth="110">
                            <el-input v-model="addModel.orderNum"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item label="Permission" prop="code" labelWidth="110">
                            <el-input v-model="addModel.code"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col v-if="addModel.type != '2'" :span="12" :offset="0">
                        <el-form-item label="Route Path" prop="path" labelWidth="110">
                            <el-input v-model="addModel.path"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="addModel.type == '1'" :span="12" :offset="0">
                        <el-form-item label="URL" prop="url" labelWidth="110">
                            <el-input v-model="addModel.url"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

        </template>
    </SysDialog>
    <!-- Parent Menu -->
    <ParentMenu ref="parentRef" @selectParent="selectParent"></ParentMenu>
</template>

<script setup lang="ts">
import ParentMenu from './ParentMenu.vue';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { nextTick, reactive, ref } from 'vue';
import { MenuType, SelectNode } from '@/api/menu/MenuModel'
import { ElMessage, FormInstance } from 'element-plus';
import { addApi, editApi } from '@/api/menu';
import { EditType, Title } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';

const { global } = useInstance()
const parentRef = ref<{ showParent: () => void }>()
const addFormRef = ref<FormInstance>();

//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog();
//弹框显示
const show = (type: string, row?: MenuType) => {
    dialog.width = 700;
    type == EditType.ADD ? (dialog.title = Title.ADD) : (dialog.title = Title.EDIT)
    if (type == EditType.EDIT) {
        //put data in dialog
        nextTick(()=> {
            global.$objCopy(row, addModel)
        })
    }
    onShow();
    //Clear form
    addFormRef.value?.resetFields();
    addModel.editType = type;
}
//暴露出去，给父组建使用
defineExpose({
    show
})
//表单绑定的Data,并设置默认值
const addModel = reactive<MenuType>({
    editType: '',
    menuId: '',
    parentId: '',
    title: '',
    code: '',
    name: '',
    path: '',
    url: '',
    type: '',
    icon: '',
    parentName: '',
    orderNum: '',
    open: false
});

//表单验证规则
const rules = reactive({
    parentName: [{
        required: true,
        trigger: 'change',
        message: 'Plase choose a Parent Menu'
    },],

    title: [{
        required: true,
        trigger: 'change',
        message: 'Plase enter a title'
    },],

    code: [{
        required: true,
        trigger: 'change',
        message: 'Plase enter a code'
    },],

    name: [{
        required: true,
        trigger: 'change',
        message: 'Plase enter the route name'
    },],

    path: [{
        required: true,
        trigger: 'change',
        message: 'Plase enter the route path'
    },],

    url: [{
        required: true,
        trigger: 'change',
        message: 'Plase enter the url'
    },],

    type: [{
        required: true,
        trigger: 'change',
        message: 'Plase choose the menu type'
    },],
});

//注册事件
const emits = defineEmits(['refresh'])

//表单提交
const commit = () => {
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if (addModel.editType == EditType.ADD) {
                res = await addApi(addModel)
            } else {
                res = await editApi(addModel)
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //refresh
                emits('refresh')
                onClose();
            }
        }
    })
}

//选择上级菜单事件
const selectOpen = () => {
    parentRef.value?.showParent()
}

//选择回调
const selectParent = (node: SelectNode) => {
    addModel.parentId = node.parentId;
    addModel.parentName = node.parentName;

}

</script>

<style scoped></style>