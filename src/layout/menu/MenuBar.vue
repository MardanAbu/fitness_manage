<template>
    <menu-logo :isCollapsed="isCollapse"></menu-logo>
    <el-menu :collapse="isCollapse" :default-active="activeIndex" class="el-menu-vertical-demo" unique-opened background-color="#304156" router>
        <menu-item :menuList="menuList"></menu-item>
    </el-menu>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import MenuItem from '@/layout/menu/MenuItem.vue';
import MenuLogo from '@/layout/menu/MenuLogo.vue';
import { collapseStore } from "@/store/collapse/index";

const colstore = collapseStore()

const isCollapse = computed(()=>{
    return colstore.getCollapse
})
//get currnt router
const route = useRoute()
//current menu index
const activeIndex = computed(()=>{
    const {path} = route;
    return path;
})
//reactive defines the response data(complex type, object)
//ref defines(basic types) let count = ref(0)
let menuList = reactive([
    {
        path: "/system",
        component: "Layout",
        name: "system",
        meta: {
            title: "System Management",
            icon: "Setting",
            roles: ["sys:manage"],
        },
        children: [
            {
                path: "/userList",
                component: "/system/user/UserList",
                name: "userList",
                meta: {
                    title: "Employee Managment",
                    icon: "UserFilled",
                    roles: ["sys:user"],
                },
            },
            {
                path: "/roleList",
                component: "/system/role/RoleList",
                name: "roleList",
                meta: {
                    title: "Role Management",
                    icon: "Wallet",
                    roles: ["sys:role"],
                },
            },
            {
                path: "/menuList",
                component: "/system/menu/MenuList",
                name: "menuList",
                meta: {
                    title: "Menu Management",
                    icon: "Menu",
                    roles: ["sys:menu"],
                },
            },
        ],
    },
    {
        path: "/memberRoot",
        component: "Layout",
        name: "memberRoot",
        meta: {
            title: "Member Management",
            icon: "Stamp",
            roles: ["sys:memberRoot"],
        },
        children: [
            {
                path: "/cardType",
                component: "/member/type/CardType",
                name: "cardType",
                meta: {
                    title: "Memberships",
                    icon: "UserFilled",
                    roles: ["sys:cardType"],
                },
            },
            {
                path: "/memberList",
                component: "/member/list/MemberList",
                name: "memberList",
                meta: {
                    title: "Members",
                    icon: "Wallet",
                    roles: ["sys:memberList"],
                },
            },
            {
                path: "/myFee",
                component: "/system/FeeList",
                name: "myFee",
                meta: {
                    title: "Transactions",
                    icon: "Menu",
                    roles: ["sys:myFee"],
                },
            },
        ],
    },

    {
        path: "/courseRoot",
        component: "Layout",
        name: "courseRoot",
        meta: {
            title: "Course Management",
            icon: "Setting",
            roles: ["sys:courseRoot"],
        },
        children: [
            {
                path: "/courseList",
                component: "/course/CourseList",
                name: "courseList",
                meta: {
                    title: "Course List",
                    icon: "UserFilled",
                    roles: ["sys:courseList"],
                },
            },
            {
                path: "/mycourse",
                component: "/mycourse/MyCourse",
                name: "mycourse",
                meta: {
                    title: "My Course",
                    icon: "Wallet",
                    roles: ["sys:mycourse"],
                },
            },
        ],
    },
]);
</script>
<style scoped lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 230px;
    min-height: 400px;
}

.el-menu {
    border-right: none;
}

:deep(.el-sub-menu .el-sub-menu__title) {
    color: #f4f4f5 !important;
}

:deep(.el-menu .el-menu-item) {
    color: #bfcbd9;
}

/* 菜单点中文字的颜色 */

:deep(.el-menu-item.is-active) {
    color: #409eff !important;
}

/* All submenu colors of the currently open menu */

:deep(.is-opened .el-menu-item) {
    background-color: #1f2d3d !important;
}

/* Color of mouse movement menu */

:deep(.el-menu-item:hover) {
    background-color: #001528 !important;
}</style>