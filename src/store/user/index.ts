import { defineStore } from "pinia";
import { getInfoApi } from "@/api/login"; 

//define store
export const userStore = defineStore('userStore', {
    state: () => {
        return {
            userId: '',
            token: '',
            userType: '',
            codeList: [],
            name:''
        }
    },
    getters: {
        getUserId(state) {
            return state.userId
        },
        getToken(state) {
            return state.token
        },
        getUserType(state){
            return state.userType
        },
        getCodeList(state){
            return state.codeList
        }
    },
    actions: {
        setUserId(userId: string) {
            this.userId = userId
        },
        setToken(token: string) {
            this.token = token
        },
        setUserType(userType: string) {
            this.userType = userType;
        },
        getInfo() {
            return new Promise((resolve, reject) => {
                getInfoApi({userId: this.userId,  userType: this.userType}).then((res) => {
                    if (res && res.code == 200) {
                        this.codeList = res.data.permissions//之前的bug，permissions写错，和后端不一致，导致codeList是空的，判断按钮permission的时候就会报错
                        this.name = res.data.name
                    }
                    resolve(this.codeList)
                }).catch((error) => {
                    reject(error)
                })
            }) 
        }

    },
    persist: {
        enabled: true,  //开启持久化操作,默认全部字段存储，存储在sessionSotrage里面
        strategies: [
            { storage: localStorage, paths: ['userId', 'token', 'codeList', 'name', 'userType'] },
        ],
    }
})