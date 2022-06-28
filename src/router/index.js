import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'


/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        name: 'Dashboard',
        hidden: true,
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index')
            }
        ]
    },

    {
        path: '/blogs',
        component: Layout,
        redirect: '/blogs/blog_manager',
        name: '博客管理',
        meta: { title: '博客管理', icon: 'example' },
        children: [
            {
                path: '/blogs/blogList',
                name: '博文列表',
                component: () => import('@/views/blog/blogList'),
                meta: { title: '博文列表', icon: 'table' }
            },
            {
                path: '/blogs/editBlog',
                name: '添加博客',
                component: () => import('@/views/blog/editBlog'),
                meta: { title: '添加博客', icon: 'table' }
            },
            {
                path: '/blogs/blog_update/:id',
                name: '更新博文',
                component: () => import('@/views/blog/editBlog'),
                meta: { title: '更新博文', icon: 'tree' },
                hidden: true
            },
            {
                path: '/blogs/tagList',
                name: '标签列表',
                component: () => import('@/views/blog/tagList'),
                meta: { title: '标签列表', icon: 'table' }
            },
            {
                path: '/blogs/authorList',
                name: '作者列表',
                component: () => import('@/views/blog/authorList'),
                meta: { title: '作者列表', icon: 'table' }
            },
            {
                path: '/blogs/sortList',
                name: '分类列表',
                component: () => import('@/views/blog/sortList'),
                meta: { title: '分类列表', icon: 'table' }
            }
        ]
    },

    {
        path: 'vedio',
        component: Layout,
        redirect: '/vedio/vedioList',
        name: '视频管理',
        meta: { title: '视频管理', icon: 'example' },
        children: [
            {
                path: '/vedio/vedioList',
                name: '视频列表',
                component: () => import('@/views/vedio/vedioList'),
                meta: { title: '视频列表', icon: 'table' }
            },
            {
                path: '/vedio/editVedio',
                name: '添加视频',
                component: () => import('@/views/vedio/editVedio'),
                meta: { title: '添加视频', icon: 'table' }
            },
            {
                path: '/vedio/vedio_update/:id',
                name: '更新视频',
                component: () => import('@/views/vedio/editVedio'),
                meta: { title: '更新视频', icon: 'tree' },
                hidden: true
            },
            {
                path: '/vedio/albumList',
                name: '专辑列表',
                component: () => import('@/views/vedio/albumList'),
                meta: { title: '专辑列表', icon: 'table' }
            },
            {
                path: '/vedio/catelogList',
                name: '视频分类列表',
                component: () => import('@/views/vedio/catelogList'),
                meta: { title: '视频分类列表', icon: 'table' }
            }
        ]
    },
    {
        path: 'other',
        component: Layout,
        redirect: '/other/bannerList',
        name: '其他管理',
        meta: { title: '其他管理', icon: 'example' },
        children: [
            {
                path: '/other/bannerList',
                name: '幻灯片列表',
                component: () => import('@/views/other/bannerList'),
                meta: { title: '幻灯片列表', icon: 'table' }
            }
        ]
    },
    {
        path: 'product',
        component: Layout,
        redirect: '/product/productList',
        name: '商品管理',
        meta: { title: '商品管理', icon: 'example' },
        children: [
            {
                path: '/product/productList',
                name: '产品列表',
                component: () => import('@/views/product/productList'),
                meta: { title: '产品列表', icon: 'table' }
            },

            {
                path: '/product/addproduct',
                name: '添加商品',
                component: () => import('@/views/product/editproduct'),
                meta: { title: '添加商品', icon: 'table' },
                hidden: true
            },
            {
                path: '/product/editproduct/:id',
                name: '修改商品',
                component: () => import('@/views/product/editproduct'),
                meta: { title: '修改商品', icon: 'table' },
                hidden: true
            },
            {
                path: '/product/catelogAttr',
                name: '分类属性',
                component: () => import('@/views/product/catelogattr'),
                meta: { title: '分类属性', icon: 'table' }
            },
            {
                path: '/product/brandsort',
                name: '品牌分类',
                component: () => import('@/views/product/brandsort'),
                meta: { title: '品牌分类', icon: 'table' }
            },
            {
                path: '/product/brandList',
                name: '品牌列表',
                component: () => import('@/views/product/brandList'),
                meta: { title: '品牌列表', icon: 'table' }
            },
            {
                path: '/product/catelogList',
                name: '商品分类列表',
                component: () => import('@/views/product/catelogList'),
                meta: { title: '商品分类列表', icon: 'table' }
            },
            {
                path: '/product/stockList',
                name: '库存管理',
                component: () => import('@/views/product/stockList'),
                meta: { title: '库存管理', icon: 'table' }
            },
            {
                path: '/product/editStock/:id',
                name: '修改库存',
                component: () => import('@/views/product/stockList'),
                meta: { title: '修改库存', icon: 'table' },
                hidden: true
            },

        ]
    },
    {
        path: 'member',
        component: Layout,
        redirect: '/member/memberList',
        name: '用户管理',
        meta: { title: '用户管理', icon: 'example' },
        children: [
            {
                path: '/member/memberList',
                name: '用户列表',
                component: () => import('@/views/member/memberList'),
                meta: { title: '用户列表', icon: 'table' }
            }
        ]
    },


    {
        path: 'order',
        component: Layout,
        redirect: '/order/vedioorder',
        name: '视频订单',
        meta: { title: '订单管理', icon: 'example' },
        children: [
            {
                path: '/order/vedioorder',
                name: '视频订单',
                component: () => import('@/views/order/vedioorder'),
                meta: { title: '视频订单', icon: 'table' }
            },
            {
                path: '/order/shoporder',
                name: '商品订单',
                component: () => import('@/views/order/shoporder'),
                meta: { title: '商品订单', icon: 'table' }
            }
        ]
    },

    {
        path: 'external-link',
        component: Layout,
        name: 'vue-admin教程',
        children: [
            {
                path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
                meta: { title: 'vue-教程', icon: 'link' }
            }
        ]
    },

    { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
    // mode: 'history', //后端支持可开
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
})
