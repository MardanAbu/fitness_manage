import { AddRoleModel } from "@/api/role/RoleModel"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { deleteApi } from "@/api/role"
import { ElMessage } from "element-plus"
import { FuncList } from "@/type/BaseType"
import useInstance from "@/hooks/useInstance"

export default function useRole(getList:FuncList) {
    const { global } = useInstance()

    const assignRoleRef = ref<{ show: (roleId: string, name: string) => void }>()

    //ref attribute of creating dialog 
    const addRef = ref<{show:(type:string, row?:AddRoleModel) => void}>()
    //create
    const addBtn = ()=>{
        addRef.value?.show(EditType.ADD)
    }
    //update
    const editBtn = (row:AddRoleModel)=>{
        addRef.value?.show(EditType.EDIT, row)
    }

    //delete
    const deleteBtn = async (row:AddRoleModel)=>{
        const confirm = await global.$myconfirm('Do you want to delete this record?')
        if(confirm){
            let res = await deleteApi(row.roleId)
            if(res && res.code == 200) {
                //Message
                ElMessage.success(res.msg)
                //Refresh list
                getList()
            }
        }   
    }

    //Permission
    const assignBtn = (row: AddRoleModel)=>{
        assignRoleRef.value?.show(row.roleId, row.roleName)
    }

    return {
        addBtn,
        editBtn,
        deleteBtn,
        addRef,
        assignRoleRef,
        assignBtn
    }

}