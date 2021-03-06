import {$http} from "@/http";


const brandService = {
    async list(params) {
        return await $http
            .get('/admin/brands', {params: params})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/brands/${id}`)
            .then(res => res.data);
    },
    async create(brand) {
        return await $http
            .post(`/admin/brands`, {...brand})
            .then(res => res.data);
    },
    async update(id, brand) {
        return await $http
            .put(`/admin/brands/${id}`, {...brand})
            .then(res => res.data);
    },
    async delete(id) {
        return await $http
            .delete(`/admin/brands/${id}`)
            .then(res => res.data);
    },
};

export default brandService;