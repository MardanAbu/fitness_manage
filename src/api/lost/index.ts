import http from "@/http";
import { LostParm, LostType } from "./LostModel";

//Create
export const addApi = (parm:LostType)=>{
    return http.post('/api/lost',parm)
}

//List
export const getListApi = (parm:LostParm)=>{
    return http.get("/api/lost/list",parm)
}

//Edit
export const editApi = (parm:LostType)=>{
    return http.put('/api/lost',parm)
}

//Delete
export const deleteApi = (lostId:string)=>{
    return http.delete(`/api/lost/${lostId}`)
}