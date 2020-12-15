import {$http} from "@/http";

const orderService = {
    async list(params) {
        return await $http
            .get('/orders', {params})
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