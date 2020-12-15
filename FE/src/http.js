import axios from "axios";
import constants from "./constants";
import auth from "@/services/auth";
import store from "@/store";
import {LOGOUT} from "@/store/actions.type";
import {useToast} from "vue-toastification";

let config = {
    baseURL: constants.host,
    timeout: 60 * 1000,
};

const $http = axios.create(config);
const toast = useToast();

$http.interceptors.request.use(
    function (config) {
        if (!store.state?.auth?.auth?.user) {
            toast.warning('You need to login to continue this action!')
            return Promise.reject('You need to login to continue this action!');
        }

        const token = auth.getAuth() && auth.getAuth().accessToken;
        if (token) {
            config.headers = {Authorization: `Bearer ${token}`};
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Add a response interceptor
$http.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response;
    },
    async function (error) {
        // Do something with response error
        if (error.response && error.response.status === 401) {
            await store.dispatch(LOGOUT)
        }

        toast.error('Something went wrong!')
        return Promise.reject(error);
    }
);

const $axios = axios.create(
    {
        baseURL: constants.host,
        timeout: 60 * 1000,
    }
);

export {$axios, $http};
