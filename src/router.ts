import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

/*
  redirect:                      if set to 'noredirect', no redirect action will be trigger when clicking the breadcrumb
  meta: {
    title: 'title'               the name showed in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon showed in the sidebar
    breadcrumb: false            if false, the item will be hidden in breadcrumb (default is true)
    hidden: true                 if true, this route will not show in the sidebar (default is false)
  }
*/

/**
  ConstantRoutes
  a base page that does not have permission requirements
  all roles can be accessed
*/
export const constantRoutes: RouteConfig[] = [
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue'),
    meta: { hidden: true }
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "404" */ '@/views/404.vue'),
    meta: {
      title: 'page404',
      hidden: true
    }
  },
  {
    path: '/home',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue'),
        name: 'Home',
        meta: {
          title: 'home',
          icon: 'home',
          affix: true
        }
      }
    ]
  },
  {
    path: '/business',
    component: Layout,
    meta: {
      title: 'business',
      icon: 'example'
    },
    children: [
      {
        path: 'shops',
        component: () => import(/* webpackChunkName: "shops" */ '@/views/shops/index.vue'),
        name: 'Shops',
        meta: {
          title: 'shops',
          icon: 'shop'
        }
      },
      {
        path: 'products',
        component: () => import(/* webpackChunkName: "products" */ '@/views/products/index.vue'),
        name: 'Products',
        meta: {
          title: 'products',
          icon: 'product'
        }
      },
      {
        path: 'categories',
        component: () => import(/* webpackChunkName: "categories" */ '@/views/categories/index.vue'),
        name: 'Categories',
        meta: {
          title: 'categories',
          icon: 'categories'
        }
      },
      {
        path: 'order',
        component: () => import(/* webpackChunkName: "order" */ '@/views/order/index.vue'),
        name: 'Order',
        meta: {
          title: 'order',
          icon: 'order'
        }
      }
    ]
  },
  {
    path: '/partner',
    component: Layout,
    meta: {
      title: 'partner',
      icon: 'partner'
    },
    children: [
      {
        path: 'supplier',
        component: () => import(/* webpackChunkName: "supplier" */ '@/views/supplier/index.vue'),
        name: 'Supplier',
        meta: {
          title: 'supplier',
          icon: 'supplier'
        }
      },
      {
        path: 'customer',
        component: () => import(/* webpackChunkName: "customer" */ '@/views/customer/index.vue'),
        name: 'Customer',
        meta: {
          title: 'customer',
          icon: 'customer'
        }
      }
    ]
  },
  {
    path: '/statistic',
    component: Layout,
    meta: {
      title: 'statistic',
      icon: 'statistic'
    },
    children: [
      {
        path: 'chart',
        component: () => import(/* webpackChunkName: "chart" */ '@/views/chart/index.vue'),
        name: 'Chart',
        meta: {
          title: 'chart',
          icon: 'chart'
        }
      },
      {
        path: 'export',
        component: () => import(/* webpackChunkName: "export" */ '@/views/export/index.vue'),
        name: 'Export',
        meta: {
          title: 'export',
          icon: 'excel'
        }
      }
    ]
  },
  {
    path: '/hrm',
    component: Layout,
    meta: {
      title: 'hrm',
      icon: 'peoples'
    },
    children: [
      {
        path: '',
        component: () => import(/* webpackChunkName: "personnel" */ '@/views/personnel/index.vue'),
        name: 'Personnel',
        meta: {
          title: 'personnel',
          icon: 'user'
        }
      },
      {
        path: 'timekeeping',
        component: () => import(/* webpackChunkName: "timekeeping" */ '@/views/timekeeping/index.vue'),
        name: 'Timekeeping',
        meta: {
          title: 'timekeeping',
          icon: 'calendar'
        }
      },
      {
        path: 'task',
        component: () => import(/* webpackChunkName: "task" */ '@/views/task/index.vue'),
        name: 'Task',
        meta: {
          title: 'task',
          icon: 'task'
        }
      },
      {
        path: 'request',
        component: () => import(/* webpackChunkName: "request" */ '@/views/request/index.vue'),
        name: 'Request',
        meta: {
          title: 'request',
          icon: 'form'
        }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    meta: {
      title: 'setting',
      icon: 'setting'
    },
    children: [
      {
        path: 'account',
        component: () => import(/* webpackChunkName: "account" */ '@/views/account/index.vue'),
        name: 'Account',
        meta: {
          title: 'account',
          hidden: true,
          icon: 'user'
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/index.vue'),
        name: 'Users',
        meta: {
          title: 'user',
          icon: 'user'
        }
      },
      {
        path: 'permission',
        component: () => import(/* webpackChunkName: "permission" */ '@/views/permission/index.vue'),
        name: 'Permission',
        meta: {
          title: 'permission',
          icon: 'lock'
        }
      }
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes: RouteConfig[] = [
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: 'page404',
      hidden: true
    }
  }
]

const createRouter = () => new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  base: process.env.BASE_URL,
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher // reset router
}

export default router
