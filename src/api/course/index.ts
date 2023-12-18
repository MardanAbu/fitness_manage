import http from "@/http";
import { CourseListParm, CourseType } from "./CourseModel";

//Image uploading
export const uploadImageApi = (parm: object) => {
    return http.upload("/api/upload/uploadImage", parm)
}

//Get coach of the course
export const getTeacherApi = ()=>{
    return http.get("/api/user/getTeacher")
}

//Create
export const addApi = (parm:CourseType)=>{
    return http.post("/api/course",parm)
}

//List
export const listApi = (parm:CourseListParm)=>{
    return http.get("/api/course/list",parm)
}

//Edit
export const editApi = (parm:CourseType)=>{
    return http.put("/api/course",parm)
}

//Delete
export const deleteApi = (courseId:string)=>{
    return http.delete(`/api/course/${courseId}`)
}