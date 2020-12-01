import {$axios} from "@/http";

const productService = {
    async list(params) {
        return await $axios
            .get('/products', {params})
            .then(res => res.data);
    },
};

export default productService;