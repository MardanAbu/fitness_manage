import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        component: () => import('@/layout/dashboard/Index.vue'),
        name: 'dashboard',
        meta: {
          title: 'Home',
          icon: '#icondashboard'
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    name: "system",
    meta: {
      title: "System Manage",
      icon: "el-icon-menu",
      roles: ["sys:manage"]
    },
    children: [
      {
        path: "/userList",
        component: () => import('@/views/system/user/UserList.vue'),
        name: "userList",
        meta: {
          title: "Users",
          icon: "el-icon-s-custom",
          roles: ["sys:user"]
        },
      },
      {
        path: "/roleList",
        component: () => import('@/views/system/role/RoleList.vue'),
        name: "roleList",
        meta: {
          title: "Roles",
          icon: "el-icon-s-tools",
          roles: ["sys:role"]
        },
      },
      {
        path: "/menuList",
        component: () => import('@/views/system/menu/MenuList.vue'),
        name: "menuList",
        meta: {
          title: "Menu",
          icon: "el-icon-document",
          roles: ["sys:menu"]
        },
      },
    ]
  },
  {
    path: "/memberRoot",
    component: Layout,
    name: "memberRoot",
    meta: {
      title: "Members",
      icon: "Setting",
      roles: ["sys:memberRoot"],
    },
    children: [
      {
        path: "/cardType",
        component: () => import('@/views/member/type/CardType.vue'),
        name: "cardType",
        meta: {
          title: "Memberships",
          icon: "UserFilled",
          roles: ["sys:cardType"],
        },
      },
      {
        path: "/memberList",
        component: () => import('@/views/member/list/MemberList.vue'),
        name: "memberList",
        meta: {
          title: "Members",
          icon: "Wallet",
          roles: ["sys:memberList"],
        },
      },
      {
        path: "/myFee",
        component: () => import('@/views/member/fee/MyFee.vue'),
        name: "myFee",
        meta: {
          title: "My finance",
          icon: "Menu",
          roles: ["sys:myFee"],
        },
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router