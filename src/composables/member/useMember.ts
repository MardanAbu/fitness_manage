import { ref } from "vue";
import { FuncList } from "@/type/BaseType";
import { EditType } from "@/type/BaseEnum";
import { MemberType } from "@/api/member/MemberModel";
import { deleteApi } from "@/api/member";
import { ElMessage } from "element-plus";
import useInstance from "@/hooks/useInstance";

export default function useMember(getList: FuncList) {
    const { global } = useInstance()

    const addRef = ref<{ show: (type: string, row?: MemberType) => void }>()

    //Create
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row: MemberType) => {
        addRef.value?.show(EditType.EDIT, row)
    }

    //Delte
    const deleteBtn = async (row: MemberType) => {
        const confirm = await global.$myconfirm('Do you want to delete this record?')
        if (confirm) {
            let res = await deleteApi(row.memberId)
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                getList()
            }
        }
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        addRef
    }
}