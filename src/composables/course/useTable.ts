import { reactive } from "vue";
import { CourseListParm } from "@/api/course/CourseModel";

export default function useTable(){
    //list searching parm
    const listParm = reactive<CourseListParm>({
        courseName:'',
        currentPage:1,
        pageSize:10,
        total:0
    })

    return{
        listParm
    }
}