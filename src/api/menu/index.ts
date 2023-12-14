import http from "@/http";
import { MenuType } from "./MenuModel";

//search parent menu data
export const getParentApi = () => {
    return http.get("/api/menu/parent")
}

//Create
export const addApi = (parm: MenuType) => {
    return http.post("/api/menu", parm)
}

//List
export const getListApi = () => {
    return http.get("/api/menu/list")
}

//Edit
export const editApi = (parm: MenuType) => {
    return http.put("/api/menu", parm)
}

//Delete
export const deleteApi = (menuId:string | number)=> {
    return http.delete(`/api/menu/${menuId}`)
}