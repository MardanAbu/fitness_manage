import { defineStore } from 'pinia'
//define store
export const testStore = defineStore('testStore',{
    state: () => {
        return {
            count: 0
        }
    },
    //define getters
    getters:{
        getCount(state){
            return state.count
        }
    },
    
    actions:{
        //set count value
        setCount(count:number){
            this.count = count;
        }
    }
})