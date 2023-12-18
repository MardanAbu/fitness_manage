<template>
  <SysDialog :title="dialog.title" :width="dialog.width" :height="dialog.height" :visible="dialog.visible"
    @onClose="onClose" @onConfirm="commit">
    <template v-slot:content>
      <el-tree ref="assignTree" :data="assignTreeData.list" node-key="menuId" :props="defaultProps" empty-text="No data"
        :show-checkbox="true" default-expand-all :highlight-current="true"
        :default-checked-keys="assignTreeData.assignTreeChecked"></el-tree>
    </template>
  </SysDialog>
</template>
  
<script setup lang="ts">
import SysDialog from "@/components/SysDialog.vue";
import useDialog from "@/hooks/useDialog";
import useAssign from "@/composables/role/useAssign";
import { userStore } from "@/store/user";
import { reactive, ref } from "vue";
import { ElMessage, ElTree } from "element-plus";
import { SaveAssignParm } from "@/api/role/RoleModel";
import { saveRoleMenuApi } from "@/api/role/index";

//树的ref属性
const assignTree = ref<InstanceType<typeof ElTree>>();

const store = userStore();

//提交参数
const saveParm = reactive<SaveAssignParm>({
  roleId: "",
  list: [],
});

//获取权限树
const { defaultProps, assignTreeData, getMenuTree } = useAssign();

const { dialog, onClose, onConfirm, onShow } = useDialog();

//show dialog
const show = (roleId: string, name: string) => {
  saveParm.roleId = roleId;
  let parm = {
    roleId: roleId,
    userId: store.getUserId,
  };
  getMenuTree(parm);

  dialog.width = 300;
  dialog.height = 450;
  dialog.title = "Assign permission for[" + name + "]";
  onShow();
};
defineExpose({
  show,
});

//commit
const commit = async () => {
  //获取选择的菜单数据id
  // console.log(assignTree.value)
  let checkIds = assignTree.value?.getCheckedKeys() as string[];
  let hlfIds = assignTree.value?.getHalfCheckedKeys() as string[];
  let list = checkIds?.concat(hlfIds);
  if (list.length == 0) {
    ElMessage.warning("Plase check a menu!");
    return;
  }
  saveParm.list = list;
  console.log(checkIds);
  console.log(hlfIds);
  console.log(list);
  //提交保存
  let res = await saveRoleMenuApi(saveParm);
  if (res && res.code == 200) {
    ElMessage.success(res.msg);
    onClose();
  }
};

</script>
  
<style scoped></style>