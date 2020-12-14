import {$http} from "@/http";


const categoryService = {
    async list(params) {
        return await $http
            .get('/admin/categories', {params: params})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/categories/${id}`)
            .then(res => res.data);
    },
    async create(category) {
        return await $http
            .post(`/admin/categories`, {...category})
            .then(res => res.data);
    },
    async update(id, category) {
        return await $http
            .put(`/admin/categories/${id}`, {...category})
            .then(res => res.data);
    },
    async delete(id) {
        return await $http
            .delete(`/admin/categories/${id}`)
            .then(res => res.data);
    },
};

export default categoryService;