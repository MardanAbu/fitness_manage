import { ref } from "vue"
import useInstance from "@/hooks/useInstance";
import { LostType } from "@/api/lost/LostModel";
import { EditType } from "@/type/BaseEnum";
import { deleteApi } from "@/api/lost";
import { ElMessage } from "element-plus";
import { FuncList } from "@/type/BaseType";


export default function useLost(getList: FuncList) {

    const { global } = useInstance()

    const addRef = ref<{ show: (type: string, row?: LostType) => void }>()

    const lostPersonRef = ref<{ show: (row: LostType) => void }>()

    //Create
    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row: LostType) => {
        addRef.value?.show(EditType.EDIT, row)
    }

    //Delete
    const deleteBtn = async (row: LostType) => {
        const cofirm = await global.$myconfirm('Do you want to delete this record?')
        if(cofirm){
            let res = await deleteApi(row.lostId)
            if(res && res.code == 200){
                ElMessage.success(res.msg)
                getList()
            }
        }
    }

    //Retrun item
    const lostBtn = (row: LostType) => {
        if(row.status == '1'){
            ElMessage.warning('The item has been cliamed!')
            return;
        }
        lostPersonRef.value?.show(row)
    }
    
    return {
        addBtn,
        editBtn,
        deleteBtn,
        addRef,
        lostPersonRef,
        lostBtn
    }
}