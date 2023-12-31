//列表参数
export type MemberParm = {
    name: string,
    phone: string,
    username: string,
    currentPage: number,
    pageSize: number,
    total: number
}

//member type
export type MemberType = {
    type: string,
    memberId:string,
    name: string,
    sex: string,
    phone: string,
    age: string,
    birthDay: string,
    height: string,
    weight: string,
    joinTime: string,
    endTime: string,
    username: string,
    password: string,
    status: string,
    roleId: string
}