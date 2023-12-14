import { CardType } from "@/api/member_card/MemberModel"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import useInstance from "@/hooks/useInstance"
import { deleteApi } from "@/api/member_card"
import { ElMessage } from "element-plus"
import { FuncList } from "@/type/BaseType"

export default function useMember(getList:FuncList) {

    const { global } = useInstance()
    
    //弹框ref属性
    const addRef = ref<{ show: (type: string, row?: CardType) => void }>()
    //Create
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row: CardType) => {
        addRef.value?.show(EditType.EDIT, row)
    }

    //Delete
    const deleteBtn = async (row: CardType) => {
        let confirm = await global.$myconfirm('Do you want to delete this record?')
        if(confirm){
            let res = await deleteApi(row.cardId)
            if(res && res.code == 200){
                ElMessage.success(res.msg)
                //Refresh
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