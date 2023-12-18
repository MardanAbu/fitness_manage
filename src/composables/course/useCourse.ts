import { CourseType } from "@/api/course/CourseModel"
import { EditType } from "@/type/BaseEnum"
import { FuncList } from "@/type/BaseType"
import { ref } from "vue"
import { deleteApi } from "@/api/course"
import useInstance from "@/hooks/useInstance"
import { ElMessage } from "element-plus"

export default function useCourse(getList:FuncList){
    const { global } = useInstance()

    const addRef = ref<{show:(type:string, row?:CourseType)=>void}>()
    //Create
    const addBtn = ()=>{
        addRef.value?.show(EditType.ADD)
    }

    //Edit
    const editBtn = (row:CourseType)=>{
        addRef.value?.show(EditType.EDIT,row)
    }

    //Delete
    const deleteBtn = async (row:CourseType)=>{
        let confim = await global.$myconfirm('Do you want to delte this record?')
        if(confim){
            let res = await deleteApi(row.courseId)
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