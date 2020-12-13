import {$http} from "@/http";


const userService = {
    async list(params) {
        return await $http
            .get('/admin/users', {params: params})
            .then(res => res.data);
    },
    async get(id) {
        return await $http
            .get(`/admin/users/${id}`)
            .then(res => res.data);
    },
    async update(id, user) {
        return await $http
            .put(`/admin/users/${id}`, {...user})
            .then(res => res.data);
    },
};

export default userService;