//列表查询参数类型
export type ListParm = {
    title:string,
    currentPage:number,
    pageSize:number,
    total:number
}

//dialog's data type
export type CardType = {
    type: string,
    title: string,
    cardType: string,
    cardId: string,
    price: string,
    cardDay: number,
    status: string
}