import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/Index.vue'

//路由默认数据
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: () => import('@/views/login/Login.vue'),
    name: "login"
  },
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
  }
]

const routes: Array<RouteRecordRaw> = [

  {
    path: "/login",
    component: () => import('@/views/login/Login.vue'),
    name: "login",
  },

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
    title: "Member Management",
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
  },

{
  path: "/courseRoot",
    component: Layout,
      name: "courseRoot",
        meta: {
    title: "Course Management",
      icon: "Setting",
        roles: ["sys:courseRoot"],
    },
  children: [
    {
      path: "/courseList",
      component: () => import('@/views/course/CourseList.vue'),
      name: "courseList",
      meta: {
        title: "Course List",
        icon: "UserFilled",
        roles: ["sys:courseList"],
      },
    },
    {
      path: "/mycourse",
      component: () => import('@/views/mycourse/MyCourse.vue'),
      name: "mycourse",
      meta: {
        title: "My Course",
        icon: "Wallet",
        roles: ["sys:mycourse"],
      },
    },

  ],
  },

{
  path: "/equipmentRoot",
    component: Layout,
      name: "equipmentRoot",
        meta: {
    title: "Equipment Management",
      icon: "Setting",
        roles: ["sys:equipmentRoot"],
    },
  children: [
    {
      path: "/equipmentList",
      component: () => import('@/views/equipment/EquipmentList.vue'),
      name: "equipmentList",
      meta: {
        title: "Equipment List",
        icon: "UserFilled",
        roles: ["sys:equipmentList"],
      },
    },
  ],
  },

{
  path: "/lostRoot",
    component: Layout,
      name: "lostRoot",
        meta: {
    title: "Lost and Found",
      icon: "Setting",
        roles: ["sys:lostRoot"],
    },
  children: [
    {
      path: "/lostList",
      component: () => import('@/views/lost/LostList.vue'),
      name: "lostList",
      meta: {
        title: "Lost List",
        icon: "UserFilled",
        roles: ["sys:lostList"],
      },
    },
  ],
  },

{
  path: "/suggestRoot",
    component: Layout,
      name: "suggestRoot",
        meta: {
    title: "Feedback",
      icon: "Setting",
        roles: ["sys:suggestRoot"],
    },
  children: [
    {
      path: "/suggestList",
      component: () => import('@/views/suggest/SuggestList.vue'),
      name: "suggestList",
      meta: {
        title: "Feedbacks",
        icon: "UserFilled",
        roles: ["sys:suggestList"],
      },
    },
  ],
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes
})

export default router