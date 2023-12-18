import { defineStore } from "pinia";
import { getMenuListApi } from '@/api/login/index'
import { RouteRecordRaw } from "vue-router";
import Layout from '@/layout/Index.vue'
import Center from '@/layout/center/center.vue'
import { InfoParm } from "@/api/login/LoginModel";

const modules = import.meta.glob('../../views/**/*.vue')

//定义store
export const menuStore = defineStore('menuStore', {
    state: () => {
        return {
            menuList: []
        }
    },
    getters: {
        getMenuList(state) {
            return state.menuList
        }
    },
    actions: {
        getMenu(router: any,parm:InfoParm) {
            return new Promise((resolve, reject) => {
                getMenuListApi(parm).then((res) => {
                    let accessRoute;
                    if (res && res.code == 200) {
                        //动态生成路由
                        accessRoute = generateRoutes(res.data, router)
                        const desk = [
                            {
                                path: "/dashboard",
                                component: "Layout",
                                name: "dashboard",
                                meta: {
                                    title: "Home",
                                    icon: "HomeFilled",
                                    roles: ["sys:dashboard"],
                                },
                                children: []
                            } as any
                        ]
                        this.menuList = this.menuList.concat(accessRoute)
                    }
                    resolve(this.menuList)
                }).catch((error)=>{
                    reject(error)
                })
            })
        }
    },
    // persist: {
    //     enabled: true, //开启持久化操作,默认全部字段存储，存储在sessionSotrage里面
    //     strategies: [
    //         { storage: localStorage, paths: ['menuList'] },
    //     ],
    // }
})
export function generateRoutes(routes: RouteRecordRaw[], router: any) {
    const res: Array<RouteRecordRaw> = [];
    routes.forEach((route: any) => {
        const tmp = { ...route }
        const component = tmp.component;
        if (route.component) {
            if (component == 'Layout') {
                tmp.component = Layout;
            } else {
                tmp.component = modules[`../../views${component}.vue`]
            }
        }
        if (tmp.children && tmp.children.length > 0) {
            //如果有下级，并且component != 'Layout'
            if (route.component != 'Layout') {
                tmp.component = Center
            }
            //递归
            tmp.children = generateRoutes(tmp.children, router)
        }
        router.addRoute(tmp)
        res.push(tmp)
    })
    return res;
}