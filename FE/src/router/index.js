import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/home/Home.vue';
import ProductDetail from "@/components/home/ProductDetail";
import ProductList from "@/components/home/ProductList";
import store from '@/store';

const routes = [
    {
        path: '/products',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '',
                name: 'ProductList',
                component: ProductList
            },
            {
                path: ':id',
                name: 'ProductDetail',
                component: ProductDetail
            }
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
                component: () => import( '../components/admin/ProductList.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            },
            {
                path: ':id',
                name: 'AdminProductDetail',
                component: () => import( '../components/admin/ProductDetail.vue'),
                meta: {requiresAuth: true, roles: ['admin']}
            }
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

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!store.state?.auth?.auth?.user) {
            next({
                path: '/',
                // query: { redirect: to.fullPath }
            })
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
