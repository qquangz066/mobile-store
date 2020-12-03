import {createRouter, createWebHistory} from 'vue-router';
import Home from '../views/home/Home.vue';
import ProductDetail from "@/components/home/ProductDetail";
import ProductList from "@/components/home/ProductList";

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
        component: () => import( '../views/admin/Admin.vue')
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
