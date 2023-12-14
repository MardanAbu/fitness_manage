<template>
        <sys-dialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
            @onClose="onClose" @onConfirm="commit">
            <template v-slot:content>
                <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="100px" size="default">
                    <!-- el-row indicates one row, 24 equal parts，Divided into 12 equal parts -->
                    <el-row>
                        <el-col :span="12" :offset="0">
                            <el-form-item prop="roleName" label="Role name">
                                <el-input v-model="addModel.roleName"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12" :offset="0">
                            <el-form-item prop="remark" label="Remark">
                                <el-input v-model="addModel.remark"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>

            </template>
        </sys-dialog>
</template>

<script setup lang="ts">
import { AddRoleModel } from '@/api/role/RoleModel';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { nextTick, reactive, ref } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import { addApi, editApi } from '@/api/role/index';
import { EditType, Title } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';

const { global } = useInstance()

//table ref properties
const addFormRef = ref<FormInstance>();

//form bounded properties
const addModel = reactive<AddRoleModel>({
    type: "",
    roleId: "",
    roleName: "",
    remark: "",
});

//dialog attributes
const { dialog, onClose, onConfirm } = useDialog()
//define 'show' for parent components to invoke
const show = (type:string, row?:AddRoleModel) => {
    dialog.height = 150;
    dialog.width = 600;
    //set title
    type == EditType.ADD ? dialog.title = Title.ADD :dialog.title = Title.EDIT
    //if it is Edit, it needs to show data
    if(type == EditType.EDIT){
        nextTick(() =>{
            global.$objCopy(row, addModel);
        });
    }
    //to know it's created or edited
    addModel.type = type;
    dialog.visible = true;
    addFormRef.value?.resetFields()
};

//Expose method to child components for external calling(parent)
defineExpose({
    show
});

//form validation
const rules = reactive({
    roleName: [
        {
            required: true,
            trigger: 'change',
            message: "Please enter the role name",
        },
    ],
});
//register event
const emit = defineEmits(['refresh'])
//table commit
const commit = () => {
    // table validation rules, 1:table should have ref properties, 2:item has to add prop, 3:define table validation
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if(addModel.type == EditType.ADD){ 
                // Create
                res = await addApi(addModel);
            } else {
                res = await editApi(addModel);
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //invoke refresh method from parent(use table)
                emit('refresh')
                dialog.visible = false;
            }
        }
    });
};
</script>

<style scoped></style>