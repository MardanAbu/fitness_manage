import http from "@/http";
import { CardType, ListParm } from "./MemberModel";

//Create
export const addApi = (parm:CardType)=>{
    return http.post("/api/memberCard", parm)
}

//List
export const getListApi = (parm:ListParm)=>{
    return http.get("/api/memberCard/list", parm)
}

//Edit
export const editApi = (parm:CardType) =>{
    return http.put("/api/memberCard", parm)
}

//Delete
export const deleteApi = (cardId:string) =>{
    return http.delete(`/api/memberCard/${cardId}`)
}