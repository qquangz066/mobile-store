import {$axios} from "@/http";

const productService = {
    async list(params) {
        return await $axios
            .get('/admin/products', {params})
            .then(res => res.data);
    },
    async get(id) {
        return await $axios
            .get(`/admin/products/${id}`)
            .then(res => res.data);
    },
    async delete(id) {
        return await $axios
            .delete(`/admin/products/${id}`)
            .then(res => res.data);
    },
};

export default productService;