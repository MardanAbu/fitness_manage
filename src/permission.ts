import router from "./router";
import { userStore } from '@/store/user/index'
import { menuStore } from "./store/menu";

//白名单
const whiteList = ['/login','/scan']
//全局守卫路由
router.beforeEach(async(to, from, next) => {
    //用户store
    const ustore = userStore()
    //菜单store
    const mstore = menuStore()
    //获取token
    const token = ustore.getToken
    //判断token是否存在
    if (token) {
        if (to.path === '/login' || to.path === '/') {
            next({ path: '/' })
        } else {
            const menuList = mstore.getMenuList
            if (menuList.length>0) {
                next()
            } else {
                try {
                    //获取用户信息
                    await ustore.getInfo()
                    //从服务器获取菜单数据
                    await mstore.getMenu(router,{userId:ustore.getUserId,userType:ustore.getUserType})
                    //等待路由全部挂载
                    next({ ...to, replace: true })
                } catch (error) {
                    localStorage.clear()
                    next({ path: '/login' })
                }
            }
        }
    } else { //token不存在
        //判断是否在白名单中
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next({ path: '/login' })
        }
    }
})