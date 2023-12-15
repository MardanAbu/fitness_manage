import { MemberType } from "@/api/member/MemberModel";
import { onMounted, reactive, ref } from "vue";
import { getCardListApi } from "@/api/member";
import {CardType} from '@/api/member_card/MemberModel'
export default function useJoin(){

    //Membership list data
    const cardList = ref<CardType[]>([])
    //dialog properties
    const joinRef = ref<{show:(row:MemberType)=>void}>()

    //办卡按钮
    const joinBtn = (row:MemberType)=>{
        joinRef.value?.show(row)
    }
    //获取会员卡列表
    const getCardList = async()=>{
        let res = await getCardListApi()
        if(res && res.code == 200){
            cardList.value = res.data
        }
    }
    onMounted(()=>{
        getCardList()
    })
    return{
        joinRef,
        joinBtn,
        cardList,
        getCardList
    }
}