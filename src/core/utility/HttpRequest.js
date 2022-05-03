import axios from "axios";

class HttpRequest {
    axios;
    constructor(baseURL) {
        this.axios = axios.create({
            baseURL,
        });
        this.requsetInterceptor();
        this.reponseInterceptor();
    }

    reponseInterceptor() {
        // Add a response interceptor
        this.axios.interceptors.response.use(
            (response) => {
                // Do something with response data
                return response.data;
            },
            error => {
                // Do something with response error
                return Promise.reject(error);
            },
        );
    }

    requsetInterceptor() {
        this.axios.interceptors.request.use(
            (config) => {
                // Do something before request is sent
                return config;
            },
            error => {
                // Do something with request error
                return Promise.reject(error);
            },
        );
    }

    fetch(url, params, config = {}) {
        return this.axios.get(url, {
            params,
            ...config,
        });
    }

    create(url, data, config = {}) {
        return this.axios.post(url, data, {
            ...config,
        });
    }

    update(url, data, config = {}) {
        return this.axios.put(url, data, {
            ...config,
        });
    }

}

export default HttpRequest;
