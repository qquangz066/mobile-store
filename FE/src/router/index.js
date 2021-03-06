import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/home/Home.vue';
import ProductDetail from "@/components/home/product/ProductDetail";
import ProductList from "@/components/home/product/ProductList";
import store from '@/store';
import Cart from "@/components/home/order/Cart";
import {useToast} from "vue-toastification";
import OrderList from "@/components/home/order/OrderList";
import OrderDetail from "@/components/home/order/OrderDetail";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                alias: '',
                path: '/products',
                name: 'ProductList',
                component: ProductList
            },
            {
                path: ':id',
                name: 'ProductDetail',
                component: ProductDetail
            },
            {
                path: 'cart',
                name: 'Cart',
                component: Cart,
                meta: {requiresAuth: true},
            },
            {
                path: 'orders',
                name: 'OrderList',
                component: OrderList,
                meta: {requiresAuth: true},
            },
            {
                path: 'orders/:id',
                name: 'OrderDetail',
                component: OrderDetail
            },
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import( '../views/admin/Admin.vue'),
        meta: {requiresAuth: true, roles: ['admin']},
        children: [
            {
                alias: '',
                path: 'products',
                name: 'AdminProductList',
                component: () => import( '../components/admin/product/ProductList.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'products/:id',
                name: 'AdminProductDetail',
                component: () => import( '../components/admin/product/ProductDetail.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'products/create',
                name: 'AdminProductCreation',
                component: () => import( '../components/admin/product/ProductCreation.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'brands',
                name: 'AdminBrandList',
                component: () => import( '../components/admin/brand/BrandList.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'brands/:id',
                name: 'AdminBrandDetail',
                component: () => import( '../components/admin/brand/BrandDetail.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'brands/create',
                name: 'AdminBrandCreation',
                component: () => import( '../components/admin/brand/BrandCreation.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'users',
                name: 'AdminUserList',
                component: () => import( '../components/admin/user/UserList.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            }, {
                path: 'users/:id',
                name: 'AdminUserDetail',
                component: () => import( '../components/admin/user/UserDetail.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: 'orders',
                name: 'AdminOrderList',
                component: () => import( '../components/admin/order/OrderList.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            }, {
                path: 'orders/:id',
                name: 'AdminOrderDetail',
                component: () => import( '../components/admin/order/OrderDetail.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
        ]
    },
    {
        path: "/:catchAll(.*)",
        redirect: {name: "ProductList"}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const toast = useToast();

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state?.auth?.auth?.user) {
            next({
                path: '/',
                // query: { redirect: to.fullPath }
            })
            toast.warning('You need to login to continue this action!')
        } else {
            if (to.matched.some(record => record.meta.roles
                && !(record.meta.roles.includes(store.state?.auth?.auth?.user?.role)))) {
                next({
                    path: '/'
                })
            } else {
                next()
            }
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router;
