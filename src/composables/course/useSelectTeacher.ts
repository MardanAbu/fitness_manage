import { getTeacherApi } from "@/api/course/index";
import { reactive, ref } from "vue";
import { SelectRole } from "@/api/user/UserModel";
export default function useSelectTeacher() {
    //定义教练列表数据
    const teacherData = reactive<SelectRole>({
        list: []
    })
    //get data
    const listTeacher = async () => {
        let res = await getTeacherApi()
        if (res && res.code == 200) {
            teacherData.list = res.data
        }
    }
    
    return {
        teacherData,
        listTeacher
    }
}