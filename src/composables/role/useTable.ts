import { ListParm } from "@/api/role/RoleModel";
import { nextTick, onMounted, reactive, ref } from "vue";
import { getListApi } from "@/api/role";
export default function useTable(){
    //table height
    const tableHeight = ref(0)
    //setting data in table
    const tableList = reactive({
        list:[]
    })
    //listing param
    const listParm = reactive<ListParm>({
        roleName: '',
        pageSize: 10,
        currentPage: 1,
        total: 0
    })

    //list
    const getList = async()=>{
        let res = await getListApi(listParm)
        if(res && res.code == 200){
            console.log(res)
            //setting data in table
            tableList.list = res.data.records
            //set paging number
            listParm.total = res.data.total
        }
    }

    //searching
    const searchBtn = ()=>{
        getList()
    }

    //reset
    const resetBtn = ()=>{
        listParm.roleName = ''
        getList()
    }
    //page volume changing trigger
    const sizeChange = (val:number)=>{
        listParm.pageSize = val
        getList()
    }

    const currentChange = (val:number)=>{
        listParm.currentPage = val
        getList()
    }

    //refresh table
    const refresh = () =>{
        getList()
    }

    onMounted(()=>{
        getList()
        nextTick(()=>{
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
        tableHeight,
        refresh
    }

}