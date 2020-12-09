import {$http} from "@/http";

const productService = {
    async list(params) {
        return await $http
            .get('/admin/products', {params})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/products/${id}`)
            .then(res => res.data);
    },
    async delete(id) {
        return await $http
            .delete(`/admin/products/${id}`)
            .then(res => res.data);
    },
};

export default productService;