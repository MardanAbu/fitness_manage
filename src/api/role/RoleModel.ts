//define data type
export type AddRoleModel = {
    type:string, // create:0, update:1
    roleId:string,
    roleName:string,
    remark:string
}

//List of query parameter types
export type ListParm = {
    roleName:string,
    currentPage:number,
    pageSize:number,
    total:number
}

export type AssignParm = {
    roleId:string,
    userId:string
}

export type SaveAssignParm = {
    roleId:string,
    list:Array<string>
}