<template>
  <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
    @onConfirm="commit" @onClose="onClose">
    <template v-slot:content>
      <el-form :model="addModel" ref="addFormRef" :rules="rules" label-width="130px" size="default">
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="lostName" label="Item name">
              <el-input v-model="addModel.lostName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="foundTime" label="Found time">
              <el-date-picker style="width: 100%" v-model="addModel.foundTime" type="date"
                placeholder="Enter the found time" size="default" value-format="YYYY-MM-DD" format="YYYY-MM-DD" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="foundAddress" label="Found place">
              <el-input v-model="addModel.foundAddress"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="foundPerson" label="Found person">
              <el-input v-model="addModel.foundPerson"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" :offset="0">
            <el-form-item prop="foundPhone" label="Phone">
              <el-input v-model="addModel.foundPhone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item prop="status" label="Status">
              <el-radio-group v-model="addModel.status">
                <el-radio :label="'0'">Not returned</el-radio>
                <el-radio :label="'1'">Returned</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
  </SysDialog>
</template>
  
<script setup lang="ts">
import { addApi, editApi } from "@/api/lost/index";
import { LostType } from "@/api/lost/LostModel";
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import { EditType, Title } from "@/type/BaseEnum";
import { ElMessage, FormInstance } from "element-plus";
import { nextTick, reactive, ref } from "vue";
import useInstance from "@/hooks/useInstance";

const { global } = useInstance()

const addFormRef = ref<FormInstance>();

//dialog
const { dialog, onClose, onConfirm, onShow } = useDialog();

//定义外部使用的方法
const show = (type: string, row?: LostType) => {
  dialog.width = 900;

  type == EditType.ADD
    ? (dialog.title = Title.ADD)
    : (dialog.title = Title.EDIT)

  //if edit set data into dialog
  if (type == EditType.EDIT) {
    nextTick(() => {
      global.$objCopy(row, addModel);
    })
  }
  onShow();
  addModel.type = type;
  addFormRef.value?.resetFields();
};

defineExpose({
  show,
});

const addModel = reactive<LostType>({
  type: "",
  lostId: "",
  lostName: "",
  foundTime: "",
  foundAddress: "",
  foundPerson: "",
  foundPhone: "",
  status: "",
  lostPerson: "",
});

//dialog validation
const rules = reactive({
  lostName: [
    {
      trigger: "blur",
      message: "Enter the item name",
      required: true,
    },
  ],
  foundTime: [
    {
      trigger: "blur",
      message: "enter found time",
      required: true,
    },
  ],
  foundAddress: [
    {
      trigger: "blur",
      message: "enter found place",
      required: true,
    },
  ],
  foundPerson: [
    {
      trigger: "blur",
      message: "enter found person",
      required: true,
    },
  ],
  foundPhone: [
    {
      trigger: "blur",
      message: "enter phone number",
      required: true,
    },
  ],
  status: [
    {
      trigger: "blur",
      message: "Please choose status",
      required: true,
    },
  ],
});

const emits = defineEmits(['refresh'])

//Commit
const commit = () => {
  addFormRef.value?.validate(async (valid) => {
    if (valid) {
      let res = null;
      if (addModel.type == EditType.ADD){
        res = await addApi(addModel)
      } else{
        res = await editApi(addModel)
      }
      if (res && res.code == 200) {
        ElMessage.success(res.msg)
        emits('refresh');
        onClose();
      }
    }
  });
};
</script>
  
<style scoped></style>