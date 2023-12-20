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
    teacherId:string,
    courseHour:number,
    courseDetails:string,
    coursePrice:number
}
export type SelectCourse = {
    courseId:string,
    memberId:string
}
export type MyCourseListParm = {
    userType:string,
    userId:string,
    currentPage:number,
    pageSize:number,
    total:number
}