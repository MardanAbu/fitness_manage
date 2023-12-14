import { nextTick, onMounted, reactive, ref } from "vue";
import { ListParm } from "@/api/member_card/MemberModel";
import { getListApi } from "@/api/member_card";

export default function useMemberTable(){

    //Table height(为了把分页选项弄到最下面)
    const tableHeight = ref(0)

    //List data
    const tableList = reactive({
        list:[]
    })
    //Searching parm
    const listParm = reactive<ListParm>({
        title:'',
        pageSize: 10,
        currentPage: 1,
        total: 0
    })
    //searching list
    const getList = async()=>{
        let res = await getListApi(listParm)
        if(res && res.code == 200){
            console.log(res)
            tableList.list = res.data.records
            listParm.total = res.data.total
        }
    }

    //searching
    const searchBtn = ()=>{
        getList()
    }

    //Reset
    const resetBtn = ()=>{
        listParm.title = ''
        getList()
    }

    //Refresh table
    const refresh = ()=>{
        getList()
    }

    //页容量改变时触发
    const sizeChange = (size:number) => {
        listParm.pageSize = size
        getList()
    }

    //页书改变时触发
    const currentChange = (page:number)=>{
        listParm.currentPage = page
        getList()
    }

    onMounted(()=>{
        getList()
        nextTick(()=>{
            tableHeight.value = window.innerHeight - 230
        })
    })

    return{
        listParm,
        getList,
        searchBtn,
        resetBtn,
        tableList,
        sizeChange,
        currentChange,
        tableHeight,
        refresh
    }
}