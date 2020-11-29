import {$axios} from "@/http";

const productService = {
    async list() {
        return await $axios
            .get('/products/')
            .then(res => res.data);
    },
};

export default productService;