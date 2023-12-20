import { CourseType } from "@/api/course/CourseModel"
import { EditType } from "@/type/BaseEnum"
import { FuncList } from "@/type/BaseType"
import { ref } from "vue"
import { deleteApi, joinCourseApi } from "@/api/course"
import useInstance from "@/hooks/useInstance"
import { ElMessage } from "element-plus"
import { userStore } from "@/store/user"

export default function useCourse(getList:FuncList){
    const store = userStore()
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

    //选课
    const joinBtn = async(row: CourseType)=>{
        //信息确定
        let confirm =  await global.$myconfirm('Do you want to register this course?')
        if(confirm){
            let res = await joinCourseApi({
                courseId:row.courseId,
                memberId:store.getUserId
            })
            if(res && res.code == 200){
                ElMessage.success(res.msg)
            }
        }
    }

    return{
        addBtn,
        editBtn,
        deleteBtn,
        addRef,
        joinBtn
    }
}