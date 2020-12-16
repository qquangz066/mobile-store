import {$http} from "@/http";


const orderService = {
    async list(params) {
        return await $http
            .get('/admin/orders', {params: params})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/orders/${id}`)
            .then(res => res.data);
    },
    async patch(id, order) {
        return await $http
            .patch(`/admin/orders/${id}`, {...order})
            .then(res => res.data);
    },
};

export default orderService;