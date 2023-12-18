import http from "@/http";
import { AddRoleModel, AssignParm, ListParm, SaveAssignParm } from "./RoleModel";

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

//查询权限树数据
export const getMenuTreeApi =(parm:AssignParm)=>{
    return http.get('/api/role/getMenuTree',parm)
}

//Save permission
export const saveRoleMenuApi =(parm:SaveAssignParm)=>{
    return http.post('/api/role/saveRoleMenu',parm)
}