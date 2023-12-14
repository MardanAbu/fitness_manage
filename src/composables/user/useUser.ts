import { AddUserModel } from "@/api/user/UserModel"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { deleteApi } from "@/api/user"
import { ElMessage } from "element-plus"
import { FuncList } from "@/type/BaseType"
import useInstance from "@/hooks/useInstance"

export default function useUser(getList: FuncList) {
    const { global } = useInstance()

    //新增组建的ref属性
    const addRef = ref<{ show: (type: string, row?: AddUserModel) => void }>()

    //Create
    const addBtn = () => {
        //父组件调用子组建show方法
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row: AddUserModel) => {
        addRef.value?.show(EditType.EDIT, row)
    }

    //Delete
    const deleteBtn = async (row: AddUserModel) => {
        const confirm = await global.$myconfirm('Do you want to delete this record?')
        if (confirm) {
            let res = await deleteApi(row.userId)
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                //refresh
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