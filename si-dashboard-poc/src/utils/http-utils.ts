import axios, {
    AxiosAdapter,
    AxiosBasicCredentials,
    AxiosProxyConfig,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosTransformer,
    CancelToken,
} from 'axios';
import Logger from '../utils/logger.utils';
import { CacheConfig } from '../entities/cache';

axios.defaults.withCredentials = true;

const defaultTimeoput: number = 5 * 1000;

class HttpResponse<T = any> {
    data: T;
    status?: number;
    statusText?: string;
    headers?: any;
    config?: AxiosRequestConfig;
    request?: any;
}
enum HttpRequestDataType {
    JSON = 'JSON',
    JSONP = 'JSONP',
    SCRIPTP = 'SCRIPTP',
}

class HttpRequestConfig {
    url?: string;
    method?: string;
    baseURL?: string;
    transformRequest?: AxiosTransformer | AxiosTransformer[];
    transformResponse?: AxiosTransformer | AxiosTransformer[];
    headers?: any;
    params?: any;
    paramsSerializer?: (params: any) => string;
    data?: any;
    timeout?: number;
    withCredentials?: boolean;
    adapter?: AxiosAdapter;
    auth?: AxiosBasicCredentials;
    responseType?: string;
    xsrfCookieName?: string;
    xsrfHeaderName?: string;
    onUploadProgress?: (progressEvent: any) => void;
    onDownloadProgress?: (progressEvent: any) => void;
    maxContentLength?: number;
    validateStatus?: (status: number) => boolean;
    maxRedirects?: number;
    httpAgent?: any;
    httpsAgent?: any;
    proxy?: AxiosProxyConfig;
    cancelToken?: CancelToken;
    cache?: CacheConfig;
    dataType?: HttpRequestDataType;
    callbackParamName?: string;
    useBrowserLanguageSetting?: boolean = false;
    variablesToBeReplaced?: { [key: string]: any[] };
}

class HttpUtils {
    private getDefaultConfig: HttpRequestConfig = {};
    public async get<T = any>(url: string, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        try {
            const config2: HttpRequestConfig = Object.assign(
                {},
                this.getDefaultConfig,
                axios.defaults || {},
                { timeout: defaultTimeoput },
                config || {},
            );
            // @ts-ignore
            const res: AxiosResponse<T> = await axios.get<T>(url, config2);
            const httpResponse: HttpResponse = new HttpResponse<T>();
            Object.assign(httpResponse, res);
            return httpResponse;
        } catch (e) {
            Logger.error(e);
            throw e;
        }
    }

    private postDefaultConfig: HttpRequestConfig = {};
    public async post<T = any>(url: string, data: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        try {
            const config2: HttpRequestConfig = Object.assign(
                {},
                this.postDefaultConfig,
                axios.defaults || {},
                { timeout: defaultTimeoput },
                config || {},
            );
            // @ts-ignore
            const res: AxiosResponse<T> = await axios.post<T>(url, data, config2);
            const httpResponse: HttpResponse = new HttpResponse<T>();
            Object.assign(httpResponse, res);
            return httpResponse;
        } catch (e) {
            Logger.info(e);
            throw e;
        }
    }
    public async put<T = any>(url: string, data: any, config?: HttpRequestConfig): Promise<HttpResponse<T>> {
        try {
            const config2: HttpRequestConfig = Object.assign(
                {},
                this.postDefaultConfig,
                axios.defaults || {},
                { timeout: defaultTimeoput },
                config || {},
            );
            // @ts-ignore
            const res: AxiosResponse<T> = await axios.put<T>(url, data, config2);
            const httpResponse: HttpResponse = new HttpResponse<T>();
            Object.assign(httpResponse, res);
            return httpResponse;
        } catch (e) {
            Logger.info(e);
            throw e;
        }
    }
    public async delete(url: string, config?: HttpRequestConfig): Promise<void> {
        try {
            const config2: HttpRequestConfig = Object.assign(
                {},
                this.postDefaultConfig,
                axios.defaults || {},
                { timeout: defaultTimeoput },
                config || {},
            );
            // @ts-ignore
            await axios.delete(url, config2);
        } catch (e) {
            Logger.info(e);
            throw e;
        }
    }
}

const httpUtils = new HttpUtils();

export { httpUtils, HttpResponse, HttpRequestConfig, CacheConfig, HttpRequestDataType };
