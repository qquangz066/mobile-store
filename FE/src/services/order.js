import {$http} from "@/http";
import store from '@/store';

const orderService = {
    async list(params) {
        return await $http
            .get('/orders', {params: {...params, email: store.state.auth.auth?.user.email}})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/orders/${id}`)
            .then(res => res.data);
    },
    async create(order) {
        return await $http
            .post(`/orders`, {...order})
            .then(res => res.data);
    },
};

export default orderService;