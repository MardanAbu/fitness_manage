import http from "@/http"
import { ApplyCard, MemberParm, MemberType, Recharge } from "./MemberModel"

//Create
export const addApi = (parm:MemberType)=>{
    return http.post("/api/member",parm)
}

//List
export const getListApi = (parm:MemberParm)=>{
    return http.get("/api/member/list", parm)
}

//Edit
export const editApi = (parm:MemberType) =>{
    return http.put("/api/member", parm)
}

//Delete
export const deleteApi = (memberId:string)=>{
    return http.delete(`/api/member/${memberId}`)
}

//Search role id by member id
export const getRoleByMemberIdApi = (memberId:string)=>{
    return http.get("/api/member/getRoleByMemberId",{memberId:memberId})
}

//Purcahse membership
export const applySaveApi = (parm:ApplyCard)=>{
    return http.post("/api/member/joinApply",parm) 
}

//Recharge
export const rechargeApi = (parm:Recharge)=>{
    return http.post("/api/member/recharge",parm)
}

//Membership list
export const getCardListApi = ()=>{
    return http.get("/api/member/getCardList")
}