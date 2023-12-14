import { getListApi } from "@/api/user";
import { ListParm } from "@/api/user/UserModel";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useTable() {
    //table height
    const tableHeight = ref(0)

    //table data
    const tableList = reactive({
        list: []
    })
    //Searching arg
    const listParm = reactive<ListParm>({
        phone: '',
        pageSize: 10,
        currentPage: 1,
        name: '',
        total: 0
    })
    //List
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            //设置表格的数据
            console.log(res.data)
            tableList.list = res.data.records
            //设置分页总条数
            listParm.total = res.data.total
        }
    }

    //Search
    const searchBtn = () => {
        getList()
    }

    //Reset
    const resetBtn = () => {
        listParm.name= ''
        listParm.phone = ''
        getList()
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

    //refresh list
    const refresh = ()=>{
        getList()
    }

    onMounted(() => {
        getList()
        nextTick(() => {
            tableHeight.value = window.innerHeight - 230
        })
    })

    return {
        tableList,
        listParm,
        getList,
        searchBtn,
        resetBtn,
        sizeChange,
        currentChange,
        tableHeight,
        refresh
    }
}