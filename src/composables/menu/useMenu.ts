import { ref } from "vue"
import { EditType } from "@/type/BaseEnum"
import { MenuType } from "@/api/menu/MenuModel"
import useInstance from '@/hooks/useInstance';
import { deleteApi } from "@/api/menu";
import { ElMessage } from "element-plus";
import { FuncList } from "@/type/BaseType";

export default function useMenu(getList:FuncList){

    const { global } = useInstance()
    const addRef = ref<{show:(type:string,row?:MenuType)=>void}>()

    //Create
    const addBtn = ()=>{
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row:MenuType)=>{
        addRef.value?.show(EditType.EDIT, row)
    }

    //Delete
    const deleteBtn = async (row:MenuType)=>{
        let confirm = await global.$myconfirm("Do you want to delete this record?")
        if(confirm){
            let res = await deleteApi(row.menuId)
            if(res && res.code == 200){
                ElMessage.success(res.msg)
                getList()
            }
        }
    }
    return{
        addBtn,
        editBtn,
        deleteBtn,
        addRef
    }
}