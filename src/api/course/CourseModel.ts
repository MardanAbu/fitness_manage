export type CourseListParm = {
    courseName:string,
    teacherName:string,
    currentPage:number,
    pageSize:number,
    total:number
}
export type CourseType = {
    type:string,
    courseId:string,
    courseName:string,
    image:string,
    teacherName:string,
    courseHour:number,
    courseDetails:string,
    coursePrice:number
}