//自定义按钮权限指令
import { Directive } from 'vue'
import { userStore } from '@/store/user';
export const permission: Directive = {
    mounted(el, binding) {
        const store = userStore();
        
        //value按钮上的权限
        const { value } = binding;
        //获取用户所有的权限
        const permissions = store.getCodeList;
        console.log('Permissions:')
        console.log(permissions)
        //判断传递进来的按钮权限，是否存在
        if (value && value instanceof Array && value.length > 0) {
            const permissionRoles = value;
            //判断传递进来的按钮权限字段，是否存在当前用户的permissions
            const hasPermission = permissions.some((role) => {
                return permissionRoles.includes(role)
            })
            if (!hasPermission) { //没有权限时，hide
                el.style.display = 'none'
            }
        } else {
            throw new Error('need roles! Like v-permission="[\'add\',\'edit\']"')
        }
    }
}