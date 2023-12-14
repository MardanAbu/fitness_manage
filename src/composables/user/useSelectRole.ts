import { getRoleByMemberIdApi } from "@/api/member";
import { getRoleApi, getSelectApi } from "@/api/user";
import { SelectRole } from "@/api/user/UserModel";
import { reactive, ref } from "vue";

export default function useSelectRole() {
    const roleId = ref('')
    const roleMemberId = ref('')

    //定义角色列表数据
    const roleData = reactive<SelectRole>({
        list: []
    })
    //get data
    const listRole = async()=>{
        let res = await getSelectApi()
        if(res && res.code == 200) {
            console.log(res)
            roleData.list = res.data
        }
    }

    //search role by userId
    const getRole = async(userId:string)=>{
        roleId.value = ''
        let res = await getRoleApi(userId)
        if(res && res.code == 200 && res.data){
            roleId.value = res.data.roleId
        }
    }

    //Search role id by member id
    const getMemberRole = async (memberId: string) => {
        roleMemberId.value = ''
        let res = await getRoleByMemberIdApi(memberId)
        if (res && res.code == 200 && res.data) {
            roleMemberId.value = res.data.roleId
        }
    }
    return{
        roleData,
        listRole,
        getRole,
        roleId,
        getMemberRole,
        roleMemberId
    }
}