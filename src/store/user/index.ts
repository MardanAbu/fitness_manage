import { defineStore } from "pinia";
import { getInfoApi } from "@/api/login"; 

//define store
export const userStore = defineStore('userStore', {
    state: () => {
        return {
            userId: '',
            token: '',
            userType: '',
            codeList: []
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
                getInfoApi({ userType: this.userType, userId: this.userId }).then((res) => {
                    if (res && res.code == 200) {
                        this.codeList = res.data.permissons
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
            { storage: localStorage, paths: ['userId', 'token'] },
        ],
    }
})