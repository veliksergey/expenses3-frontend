import type { UseFetchOptions } from "nuxt/app";

type ApiPayload = {
    method: 'get' | 'post' | 'put' | 'delete';
    url: string;
    body?: any;
    params?: any;
    query?: any;
}

export default class {
    baseUrl: string;

    constructor() {
        const config = useRuntimeConfig();
        this.baseUrl = config.public.backendUrl;
    }

    callApi({url, method, body, params, query}: ApiPayload) {
        const options: UseFetchOptions<any> = {
            baseURL: this.baseUrl,
            method,
        }
        if (body) options.body = body;
        if (params) options.params = params;
        if (query) options.query = query;

        return useFetch(url, options);
    }

    async get (url: string) {
        return this.callApi({url, method: 'get'});
    }

    async post (url: string, body: any) {
        return this.callApi({
            url,
            body,
            method: 'post',
        });
    }

    async put (url: string, body: any) {
        return this.callApi({
            url,
            body,
            method: 'put',
        });
    }

    async delete (url: string, body: any) {
        return this.callApi({
            url,
            body,
            method: 'delete',
        })
    }

}