import { getListApi } from "@/api/equipment";
import { ListParm } from "@/api/equipment/EquipmentModel";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useTable() {

    const tableHeight = ref(0)
    //定义表格数据
    const tableData = reactive({
        list: []
    })

    //searching args
    const listParm = reactive<ListParm>({
        name: '',
        currentPage: 1,
        pageSize: 10,
        total: 10
    })

    //get table data
    const getList = async () => {
        let res = await getListApi(listParm)
        if (res && res.code == 200) {
            console.log(res)
            tableData.list = res.data.records;
            listParm.total = res.data.total;
        }
    }

    //search
    const searchBtn = () => {
        getList()
    }
    //reset
    const resetBtn = () => {
        listParm.name = ''
        listParm.currentPage = 1
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
    //刷新列表
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
        searchBtn,
        resetBtn,
        tableData,
        sizeChange,
        currentChange,
        tableHeight,
        reFresh,
        getList
    }
}