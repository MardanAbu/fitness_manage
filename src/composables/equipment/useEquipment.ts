import { EquipmentType } from "@/api/equipment/EquipmentModel"
import { EditType } from "@/type/BaseEnum"
import { ref } from "vue"
import { deleteApi } from "@/api/equipment"
import useInstance from "@/hooks/useInstance"
import { ElMessage } from "element-plus"
import { FuncList } from "@/type/BaseType"

export default function useEquiment(getList: FuncList) {
    const { global } = useInstance()

    const addRef = ref<{ show: (type: string, row?: EquipmentType) => void }>()

    const addBtn = () => {
        addRef.value?.show(EditType.ADD)
    }

    const etidBtn = (row: EquipmentType) => {
        addRef.value?.show(EditType.EDIT, row)
    }

    const deleteBtn = async (row: EquipmentType) => {
        const confirm = await global.$myconfirm('Do you want to delete this record?')
        if (confirm) {
            let res = await deleteApi(row.id)
            if (res && res.code == 200) {
                ElMessage.success(res.msg)
                getList()
            }
        }
    }

    return {
        addBtn,
        etidBtn,
        deleteBtn,
        addRef
    }
}
