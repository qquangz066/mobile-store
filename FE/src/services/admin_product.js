import {$http} from "@/http";

const defaultParams = {
    '$populate[0]': 'brand',
    '$populate[1]': 'category'
}

const productService = {
    async list(params) {
        return await $http
            .get('/admin/products', {params: {...params, ...defaultParams}})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/products/${id}`, {params: defaultParams})
            .then(res => res.data);
    },
    async update(id, product) {
        return await $http
            .put(`/admin/products/${id}`, {...product})
            .then(res => res.data);
    },
    async delete(id) {
        return await $http
            .delete(`/admin/products/${id}`)
            .then(res => res.data);
    },
};

export default productService;