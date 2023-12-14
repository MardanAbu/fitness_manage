import { onMounted, reactive, ref, nextTick} from "vue";
import { getListApi } from "@/api/menu";

export default function useMenuTable() {

    //table height
    const tableHeight = ref(0)
    
    //table data
    const tableList = reactive({
        list:[]
    })

    //get table data
    const getList = async () => {
        let res = await getListApi()
        if (res && res.code == 200) {
            tableList.list = res.data
        }
    }

    //refresh table
    const refresh = ()=>{
        getList()
    }

    onMounted(() => {
        getList()
        nextTick(()=>{
            tableHeight.value = window.innerHeight - 200
        })
    })

    return {
        tableList,
        getList,
        tableHeight,
        refresh
    }

}