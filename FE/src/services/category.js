import {$axios} from "@/http";

const categoryService = {
    async list() {
        return await $axios
            .get('/categories')
            .then(res => res.data);
    },
};

export default categoryService;