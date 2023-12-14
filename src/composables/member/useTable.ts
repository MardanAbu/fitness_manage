import { MemberParm } from "@/api/member/MemberModel";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getListApi } from "@/api/member";

export default function useTable() {

    //table height
    const tableHeight = ref(0)

    //defining table data
    const tableList = reactive({
        list: []
    })

    //参数列表
    const listParm = reactive<MemberParm>({
        name: '',
        phone: '',
        username: '',
        pageSize: 10,
        currentPage: 1,
        total: 0
    })
    //List
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            tableList.list = res.data.records
            listParm.total = res.data.total
        }
    }
    //Search
    const searchBtn = () => {
        getList()
    }
    //Reset
    const resetBtn = () => {
        listParm.name = ''
        listParm.phone = ''
        listParm.username = ''
        getList()
    }

    //when page volume changes
    const sizeChange = (size: number) => {
        listParm.pageSize = size;
        getList()
    }

    //页数改变时触发
    const currentChange = (page: number) => {
        listParm.currentPage = page;
        getList()
    }

    const refresh = () => {
        getList()
    }

    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 230
        })
    })

    return {
        listParm,
        getList,
        searchBtn,
        resetBtn,
        tableList,
        sizeChange,
        currentChange,
        refresh,
        tableHeight
    }
}