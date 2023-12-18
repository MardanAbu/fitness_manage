import http from "@/http/index";
import { InfoParm, LoginParm } from "./LoginModel";

//get code
export const getImageApi = ()=>{
    return http.post("/api/login/image")
}

//Login
export const loginApi = (parm:LoginParm)=>{
    return http.post("/api/login/login",parm)
}

//获取菜单数据
export const getMenuListApi = (parm:InfoParm)=>{
    return http.get("/api/login/getMenuList",parm)
}

//获取用户信息
export const getInfoApi = (parm:InfoParm)=>{
    return http.get("/api/login/getInfo",parm)
}