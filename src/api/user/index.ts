import http from "@/http";
import { AddUserModel, ListParm } from "./UserModel.ts";
//获取角色列表
export const getSelectApi =()=> {
    return http.get("/api/role/getSelect")
}

//Create
export const addApi = (parm:AddUserModel) => {
    return http.post("/api/user", parm)
}

//User list
export const getListApi = (parm:ListParm)=>{
    return http.get("/api/user/list",parm)
}

//Edit
export const editApi = (parm:AddUserModel) =>{
    return http.put('api/user', parm)
}

//Delete
export const deleteApi = (userId:string) =>{
    return http.delete(`/api/user/${userId}`)
}

//Sesrch role by user id
export const getRoleApi = (userId:string)=>{
    return http.get("/api/user/role",{userId:userId})
}
