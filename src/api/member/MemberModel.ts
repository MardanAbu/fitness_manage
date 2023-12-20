//列表参数
export type MemberParm = {
    name: string,
    phone: string,
    username: string,
    currentPage: number,
    pageSize: number,
    total: number,
    userType: string,
    memberId: string
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

//Membership type
export type ApplyCard = {
    cardId:string,
    memberId:string
}
//Recharge type
export type Recharge = {
    memberId:string,
    money:number,
    userId:string
}

export type MemberRecharge = {
    currentPage:number,
    pageSize:number,
    total:number,
    memberId:string,
    userType:string
}