import axios from "axios";
import constants from "./constants";

let config = {
    baseURL: constants.host,
    timeout: 60 * 1000,
};

const $http = axios.create(config);

$http.interceptors.request.use(
    function (config) {
        // Do something before request is sent
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
    function (error) {
        // Do something with response error
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
