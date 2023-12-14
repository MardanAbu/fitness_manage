<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">
        <template v-slot:content>
            <el-form :model="addModle" ref="addFormRef" :rules="rules" label-width="80px" size="default">

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="name" label="Name">
                            <el-input v-model="addModle.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="sex" label="Gender">
                            <el-radio-group v-model="addModle.sex">
                                <el-radio :label="'0'">Male</el-radio>
                                <el-radio :label="'1'">Female</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="phone" label="Phone">
                            <el-input v-model="addModle.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="email" label="Email">
                            <el-input v-model="addModle.email"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="salary" label="Salary">
                            <el-input v-model="addModle.salary"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="userType" label="Type">
                            <el-radio-group v-model="addModle.userType">
                                <el-radio :label="'1'">Employee</el-radio>
                                <el-radio :label="'2'">Coach</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="roleId" label="Role">
                            <el-select v-model="addModle.roleId" class="m-2" placeholder="Please choose the role"
                                size="default">
                                <el-option v-for="item in roleData.list" :key="item.value" :label="item.label"
                                    :value="item.value" />
                                <!-- 会获取user_role表中的字段 -->
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="status" label="Status">
                            <el-radio-group v-model="addModle.status">
                                <el-radio :label="'0'">Disable</el-radio>
                                <el-radio :label="'1'">Enable</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="username" label="Username">
                            <el-input v-model="addModle.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col v-if="addModle.type == '0'" :span="12" :offset="0">
                        <el-form-item prop="password" label="Password">
                            <el-input v-model="addModle.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import { AddUserModel } from '@/api/user/UserModel';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { nextTick, reactive, ref } from 'vue';
import useSelectRole from '@/composables/user/useSelectRole';
import { ElMessage, FormInstance } from 'element-plus';
import { addApi, editApi } from '@/api/user/index';
import { EditType, Title } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';

const { global } = useInstance();

//表单ref属性
const addFormRef = ref<FormInstance>()

//Role
const { roleData, listRole, roleId, getRole } = useSelectRole();
//Diaog properties
const { dialog, onClose, onConfirm, onShow } = useDialog()

//show dialog
const show = async (type: string, row?: AddUserModel) => {
    roleId.value =''
    addModle.roleId = ''
    dialog.width = 800;
    addModle.type = type;
    //get role data
    await listRole();
    await getRole(row!?.userId)//没有感叹号会报错，error without an exclamation mark
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT;
    if (type == EditType.EDIT) {
        //show data
        nextTick(() => {
            global.$objCopy(row, addModle)
            addModle.roleId = roleId.value
        });
    }
    onShow()
    //Clear dialog
    addFormRef.value?.resetFields()
}

//暴露出去给父组件调用
defineExpose({
    show
})

//表单绑定的对象
const addModle = reactive<AddUserModel>({
    userId: "",
    type: "",
    roleId: "",
    username: "",
    password: "",
    phone: "",
    email: "",
    sex: "",
    userType: "",
    status: "",
    salary: "",
    name: ""
});
//表单验证规则
const rules = reactive({
    name: [
        {
            required: true,
            trigger: 'change',
            message: 'Please enter the name'
        },
    ],
    phone: [
        {
            required: true,
            trigger: 'change',
            message: 'Please enter phone number'
        },
    ],
    sex: [
        {
            required: true,
            trigger: 'change',
            message: 'Please choose the gender'
        },
    ],
    type: [
        {
            required: true,
            trigger: 'change',
            message: 'Please choose the type'
        },
    ],
    status: [
        {
            required: true,
            trigger: 'change',
            message: 'Please choose the status'
        },
    ],
    salary: [
        {
            required: true,
            trigger: 'change',
            message: 'Please enter the salary'
        },
    ],
    username: [
        {
            required: true,
            trigger: 'change',
            message: 'Please enter the account number'
        },
    ],
    password: [
        {
            required: true,
            trigger: 'change',
            message: 'Please enter the password'
        },
    ],
    roleId: [
        {
            required: true,
            trigger: 'change',
            message: 'Please choose the role type'
        },
    ],
});

//注册事件
const emits = defineEmits(['refresh'])

//表单提交
const commit = () => {
    addFormRef.value?.validate(async (valid) => {
        if (valid) {
            let res = null;
            if(addModle.type == EditType.ADD){
                res = await addApi(addModle)
            }else{
                res = await editApi(addModle)
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //Refresh table
                emits('refresh')
                onClose();
            }
        }
    });
};
</script>

<style scoped></style>