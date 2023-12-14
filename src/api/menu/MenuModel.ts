//Menu data type
export type MenuType = {
    editType:string,
    menuId:string | number,
    parentId:string | number,
    title:string,
    code:string,
    name:string,
    path:string,
    url:string,
    type:string,
    icon:string,
    parentName:string,
    orderNum:string,
    open:boolean
}

export type SelectNode = {
    parentId: string | number,
    parentName: string
}