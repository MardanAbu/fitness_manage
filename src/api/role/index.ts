import http from "@/http";
import { AddRoleModel, ListParm } from "./RoleModel";

//create
export const addApi = (parm:AddRoleModel)=>{
    return http.post('/api/role',parm)
}

//inquery
export const getListApi = (parm:ListParm) =>{
    return http.get('/api/role/list',parm)
}

//Edit
export const editApi = (parm:AddRoleModel) => {
    return http.put('/api/role', parm)
}

//Delete
export const deleteApi = (roleId:string) => {
    return http.delete(`/api/role/${roleId}`)
}