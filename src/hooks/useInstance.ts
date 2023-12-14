import { getCurrentInstance,ComponentInternalInstance  } from "vue";

export default function useInstance(){
    const {appContext,proxy} =  getCurrentInstance() as ComponentInternalInstance 
    const global = appContext.config.globalProperties;
    return{
        proxy,
        global
    }
}
//通过这个函数，可以在组件内部获取到当前组件实例的代理对象以及全局属性，方便在组件内进行操作和访问相关数据