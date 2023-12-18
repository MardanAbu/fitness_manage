import http from "@/http";
import { EquipmentType, ListParm } from "./EquipmentModel";

//Create
export const addApi = (parm:EquipmentType)=>{
    return http.post('/api/equipment',parm)
}

//List
export const getListApi = (parm:ListParm)=>{
    return http.get("/api/equipment/list",parm)
}

//Edit
export const editApi = (parm:EquipmentType)=>{
    return http.put('/api/equipment',parm)
}
//Delete
export const deleteApi = (id:string)=>{
    return http.delete(`/api/equipment/${id}`)
}