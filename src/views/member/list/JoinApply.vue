<template>
    <SysDialog :title="dialog.title" :height="dialog.height" :width="dialog.width" :visible="dialog.visible"
        @onClose="onClose" @onConfirm="commit">

        <template v-slot:content>
        <div>Please choose a membership</div>
      <el-divider style="margin: 10px 0px" />
      <el-select
        style="margin-top: 10px; width: 100%"
        v-model="parm.cardId"
        class="m-2"
        placeholder="Choose a membership"
        size="large"
      >
        <el-option
          v-for="item in cardList"
          :key="item.cardId"
          :label="item.title"
          :value="item.cardId"
        />
      </el-select>

        </template>
    </SysDialog>
</template>

<script setup lang="ts">
import { ApplyCard, MemberType } from '@/api/member/MemberModel';
import SysDialog from '@/components/SysDialog.vue';
import useDialog from '@/hooks/useDialog';
import { reactive } from 'vue';
import useJoin from '@/composables/member/useJoin'
import { applySaveApi } from '@/api/member';
import { ElMessage } from 'element-plus';

const { cardList, getCardList } = useJoin();

//Select membership type
const parm = reactive<ApplyCard>({
  cardId: "",
  memberId: "",
});

//Dialog properties
const { dialog, onClose, onConfirm, onShow } = useDialog()

//show dialog
const show = (row:MemberType)=>{
    parm.memberId = row.memberId;
    dialog.title = 'Apply membership for [' + row.name + ']';
    onShow()
}

//Expose to parent
defineExpose({
    show
})

const emits = defineEmits(['refresh'])

//Commit
const commit = async () => {
  if (!parm.cardId) {
    ElMessage.warning("Please choose a membership!");
    return;
  }
  let res = await applySaveApi(parm);
  if (res && res.code == 200) {
    ElMessage.success(res.msg);
    emits('refresh')
    onClose()
  }
};

</script>

<style scoped></style>