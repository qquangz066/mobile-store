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
                path: '/products/:id',
                name: 'ProductDetail',
                component: ProductDetail
            },
            {
                path: "/:catchAll(.*)",
                redirect: {name: "ProductList"}
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import( '../views/admin/Admin.vue'),
        meta: {requiresAuth: true},
        children: [
            {
                path: '',
                name: 'AdminProductList',
                component: () => import( '../components/admin/ProductList.vue'),
                meta: {requiresAuth: true}
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!store.state?.auth?.auth?.user) {
            next({
                path: '/',
                // query: { redirect: to.fullPath }
            })
        } else {
            next()
        }
    } else {
        next() // make sure to always call next()!
    }
})

export default router;
