<template>
    <SysDialog
      :title="dialog.title"
      :height="dialog.height"
      :width="dialog.width"
      :visible="dialog.visible"
      @onClose="onClose"
      @onConfirm="commit"
    >
      <template v-slot:content>
        <el-form
          :model="lostPerson"
          ref="lostRef"
          :rules="rules"
          label-width="110px"
          :inline="false"
          size="default"
        >
          <el-form-item prop="lostPerson" label="Cliamed by">
            <el-input
              v-model="lostPerson.lostPerson"
              placeholder="Enter cliam person"
            />
          </el-form-item>
        </el-form>
      </template>
    </SysDialog>
  </template>
  
  <script setup lang="ts">
  import { LostType } from "@/api/lost/LostModel";
  import SysDialog from "@/components/SysDialog.vue";
  import useDialog from "@/hooks/useDialog";
  import { ElMessage, FormInstance } from "element-plus";
  import { reactive, ref } from "vue";
  import { editApi } from "@/api/lost";

  const lostRef = ref<FormInstance>();

  const lostPerson = reactive<LostType>({
    type: "",
    lostId: "",
    lostName: "",
    foundTime: "",
    foundAddress: "",
    foundPerson: "",
    foundPhone: "",
    status: "1",
    lostPerson: "",
  });

  //dialog props
  const { dialog, onClose, onConfirm, onShow } = useDialog();

  const show = (row:LostType) => {
    dialog.title = "Claiming";
    dialog.height = 150;
    lostPerson.lostId = row.lostId
    onShow();
    lostRef.value?.resetFields()
  };

  defineExpose({
    show,
  });

  //Dialog validation
  const rules = reactive({
    lostPerson: [
      {
        required: true,
        message: "Enter lost person",
        trigger: "blur",
      },
    ],
  });

  const emiets = defineEmits(['reFresh'])

  //Commit
  const commit = () => {
    lostRef.value?.validate(async(valid) => {
      if(valid){
          let res = await editApi(lostPerson)
          if(res && res.code == 200){
              ElMessage.success('Return success')
              emiets('reFresh')
              onClose()
          }
      }
    });
  };
  </script>
  
  <style scoped></style>