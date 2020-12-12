import {$http} from "@/http";
import router from "@/router";

let localStorage = global.window.localStorage;

export default {
    login(email, password) {
        if (this.loggedIn()) return this.getAuth();

        return $http
            .post('/authentication', {
                "strategy": "local",
                "email": email,
                "password": password
            })
            .then(response => {
                localStorage.auth = JSON.stringify(response.data);
                return response.data;
            })
    },
    async logout() {
        localStorage.removeItem("auth");
        await router.push('/')
    },
    getAuth() {
        return this.loggedIn() ? JSON.parse(localStorage.auth) : null;
    },
    loggedIn() {
        return !!localStorage.auth;
    }
};