import { BASEURL } from "../core/Constants.ts";

const METHODS = {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
};

function queryStringify(data: Object) {
        if (typeof data !== 'object') {
                throw new Error('Data must be object');
        }

        const keys = Object.keys(data);
        return keys.reduce((result, key, index) => {
                return `${result}${key}=${data[key as keyof Object]}${index < keys.length - 1 ? '&' : ''}`;
        }, '?');
}

type Options = Record<string, any>;
type HTTPMethod = (url: string, options?: Options) => Promise<any>;

export default class HTTPTransport {
        private apiUrl: string = BASEURL;
        
        constructor(apiPath: string) {
                this.apiUrl += `${apiPath}`;
        }

        get: HTTPMethod = (url, options) => {
                return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.GET}, options?.timeout);
        };

        post: HTTPMethod = (url, options) => {
                return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.POST}, options?.timeout);
        };

        put: HTTPMethod = (url, options) => {
                return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.PUT}, options?.timeout);
        };

        delete: HTTPMethod = (url: string, options:any = {}) => { 
                return this.request(`${this.apiUrl}${url}`, {...options, method: METHODS.DELETE}, options?.timeout);
        };

        request = (url: string, options:any = {}, timeout = 5000) => {
                const { method, data } = options;

                return new Promise(function(resolve, reject) {
                        if (!method) {
                                reject('No method');
                                return;
                        }

                        const xhr = new XMLHttpRequest();
                        const isGet = method === METHODS.GET;


                        xhr.open(
                                method, 
                                isGet && !!data
                                        ? `${url}${queryStringify(data)}`
                                        : url,
                        );

                        xhr.onload = function() { resolve(xhr); };
                        xhr.onabort = reject;
                        xhr.onerror = reject;
                
                        xhr.timeout = timeout;
                        xhr.ontimeout = reject;
                        
                        let dataJSON = data;
                        
                        /**Установка хедеров */
                        xhr.withCredentials = true;
                        if (data instanceof FormData === false) {
                                xhr.setRequestHeader("Content-Type", "application/json");
                                dataJSON = data ? JSON.stringify(data) : JSON.stringify({});
                        }

                        if (isGet) {
                                xhr.send();
                        } else {
                                xhr.send(dataJSON);
                        }
                });
        };
}

