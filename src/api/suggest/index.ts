import http from "@/http";
import { SuggestParm, SuggestType } from "./SuggestModel";

//Create
export const addApi = (parm:SuggestType)=>{
    return http.post("/api/suggest",parm)
}

//List
export const listApi = (parm:SuggestParm)=>{
    return http.get("/api/suggest/list",parm)
}

//Edit
export const editApi = (parm:SuggestType)=>{
    return http.put('/api/suggest',parm)
}
//Delete
export const deleteApi = (id:string)=>{
    return http.delete(`/api/suggest/${id}`)
}