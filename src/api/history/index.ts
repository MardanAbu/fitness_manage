import http from "@/http";
import { userStore } from "@/store/user";

const store = userStore();

//get code
export const getCode = () =>{
    return http.get("/api/history/getCode?userId=" + store.getUserId)
}

export const exit = () =>{
    return http.get("/api/history/exit?userId=" + store.getUserId)
}

export const enter = (code) =>{
    return http.get("/api/history/enter?code=" + code)
}