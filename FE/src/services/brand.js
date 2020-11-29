import {$axios} from "@/http";

const brandService = {
    async list() {
        return await $axios
            .get('/brands/')
            .then(res => res.data);
    },
};

export default brandService;