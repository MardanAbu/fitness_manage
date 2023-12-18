import { nextTick, onMounted, reactive, ref } from "vue";
import { CourseListParm } from "@/api/course/CourseModel";
import { listApi } from "@/api/course";

export default function useTable() {

    const tableHeight = ref(0)
    const tableData = reactive({
        list: []
    })

    //list searching parm
    const listParm = reactive<CourseListParm>({
        courseName: '',
        teacherName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0
    })

    //Search list
    const getList = async () => {
        let res = await listApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            tableData.list = res.data.records;
            listParm.total = res.data.total;
        }
    }

    //页容量改变时触发
    const sizeChange = (size: number) => {
        listParm.pageSize = size;
        getList()
    }

    //页数改变时触发
    const currentChange = (page: number) => {
        listParm.currentPage = page;
        getList()
    }

    //search
    const searchBtn = () => {
        getList()
    }

    //Reset
    const resetBtn = () => {
        listParm.courseName = ''
        listParm.teacherName = ''
        listParm.currentPage = 1;
        listParm.pageSize = 10
        getList()
    }

    //refresh
    const reFresh = () => {
        getList()
    }
    onMounted(() => {
        nextTick(() => {
            tableHeight.value = window.innerHeight - 230
        })
        getList()
    })

    return {
        listParm,
        tableData,
        getList,
        sizeChange,
        currentChange,
        tableHeight,
        searchBtn,
        resetBtn,
        reFresh
    }
}