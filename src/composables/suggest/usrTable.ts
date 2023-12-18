import { listApi } from "@/api/suggest";
import { SuggestParm } from "@/api/suggest/SuggestModel";
import { nextTick, onMounted, reactive, ref } from "vue";

export default function useTable(){

    const tableHeight = ref(0)
    //表格数据
    const tableData = reactive({
        list:[]
    })

    //列表查询的参数
    const listParm = reactive<SuggestParm>({
        currentPage:1,
        pageSize:10,
        title:'',
        total:0
    })

    const searchBtn = ()=>{
        getList()
    }
    
    const resetBtn = ()=>{
        listParm.title = ''
        getList()
    }

    const getList = async()=>{
        let res = await listApi(listParm)
        if(res && res.code == 200){
            tableData.list = res.data.records;
            listParm.total = res.data.total
        }
    }

    //页容量改变时触发
    const sizeChange = (size:number)=>{
        listParm.pageSize = size;
        getList()
    }
    //页数改变时触发
    const currentChange = (page:number)=>{
        listParm.currentPage = page
        getList()
    }

    //Refresh
    const reFresh = ()=>{
        getList()
    }
    onMounted(()=>{
        nextTick(()=>{
            tableHeight.value = window.innerHeight - 230
        })
        getList()
    })
    
    return{
        listParm,
        searchBtn,
        resetBtn,
        getList,
        tableData,
        sizeChange,
        currentChange,
        tableHeight,
        reFresh
    }
}