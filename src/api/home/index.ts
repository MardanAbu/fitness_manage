import http from "@/http";

//total count
export const getTotalApi = ()=>{
    return http.get("/api/home/getTotal")
}

//feedbacks
export const getSuggestApi = ()=>{
    return http.get("/api/home/getSuggestList")
}