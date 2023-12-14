<template>
    <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">

        <template v-slot:content>
            <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="80px" size="default">

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="name" label="Name">
                            <el-input v-model="addModel.name"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="sex" label="Gender">
                            <el-radio-group v-model="addModel.sex">
                                <el-radio :label="'0'">Male</el-radio>
                                <el-radio :label="'1'">Female</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="phone" label="Phone">
                            <el-input v-model="addModel.phone"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="age" label="Age">
                            <el-input v-model="addModel.age"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="birthDay" label="Birthday">
                            <el-date-picker v-model="addModel.birthDay" type="date" placeholder="Choose the birthday"
                                size="default" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="joinTime" label="Joindate">
                            <el-date-picker v-model="addModel.joinTime" type="date" placeholder="Choose the join date"
                                size="default" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="height" label="Height">
                            <el-input v-model="addModel.height"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="weight" label="Wight">
                            <el-input v-model="addModel.weight"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="username" label="ID">
                            <el-input type="number" v-model="addModel.username"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="password" label="Password">
                            <el-input v-model="addModel.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-row>
                    <el-col :span="12" :offset="0">
                        <el-form-item prop="roleId" label="Role">
                            <el-select v-model="addModel.roleId" class="m-2" placeholder="Please choose the role"
                                size="default">
                                <el-option v-for="item in roleData.list" :key="item.value" :label="item.label"
                                    :value="item.value" />
                                <!-- 会获取user_role表中的字段 -->
                            </el-select>
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
import { MemberType } from '@/api/member/MemberModel';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { ElMessage, FormInstance } from 'element-plus';
import { nextTick, reactive, ref } from 'vue';
import { addApi } from '@/api/member';
import { EditType, Title } from '@/type/BaseEnum';
import useInstance from '@/hooks/useInstance';
import { editApi } from '@/api/member';
import useSelectRole from '@/composables/user/useSelectRole';

const { global } = useInstance()

const addFormRef = ref<FormInstance>();

//Role
const { roleData, listRole, roleMemberId, getMemberRole } = useSelectRole();

//弹框属性
const { dialog, onClose, onConfirm, onShow } = useDialog();

//show dialog
const show = async (type:string, row?: MemberType) => {
    await listRole()
    await getMemberRole(row!?.memberId)
    dialog.height = 300
    dialog.width = 700
    type == EditType.ADD ? dialog.title = Title.ADD : dialog.title = Title.EDIT
    if(EditType.EDIT == type){
        nextTick(()=>{
            global.$objCopy(row, addModel);
            addModel.roleId = roleMemberId.value
        });
    }
    addModel.type = type
    onShow()
    addFormRef.value?.resetFields()
}

//暴露出去给父组件使用
defineExpose({
    show
})

//表单绑定的数据对象
const addModel = reactive<MemberType>({
    type: '',
    memberId: '',
    name: '',
    sex: '',
    phone: '',
    age: '',
    birthDay: '',
    height: '',
    weight: '',
    joinTime: '',
    endTime: '',
    username: '',
    password: '',
    status: '',
    roleId: ''
});

//表单验证
const rules = reactive({
    name: [
        {
            required: true,
            trigger: "change",
            message: "Enter the name",
        },
    ],

    sex: [
        {
            required: true,
            trigger: "change",
            message: "Choose a gender",
        },
    ],

    phone: [
        {
            required: true,
            trigger: "change",
            message: "Enter the phone number",
        },
    ],

    joinTime: [
        {
            required: true,
            trigger: "change",
            message: "Choose the join date",
        },
    ],

    birthDay: [
        {
            required: true,
            trigger: "change",
            message: "Choose the birthday",
        },
    ],

    username: [
        {
            required: true,
            trigger: "change",
            message: "Enter the account ID",
        },
    ],

    password: [
        {
            required: true,
            trigger: "change",
            message: "Enter the password",
        },
    ],

    status: [
        {
            required: true,
            trigger: "change",
            message: "Choose a status",
        },
    ]

});

//注册事件
const emits = defineEmits(['refresh'])

//Dialog commit
const commit = ()=>{
    addFormRef.value?.validate(async(valid)=>{
        if(valid){
            let res = null;
            if(addModel.type == EditType.ADD){
                res = await addApi(addModel);
            }else{
                res = await editApi(addModel)
            }
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                emits('refresh')
                onClose();
            }
        }
    })
}

</script>

<style scoped></style>