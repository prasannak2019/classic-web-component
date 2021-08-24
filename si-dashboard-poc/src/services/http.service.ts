import jsonpAdapter from 'axios-jsonp';
import { httpUtils, HttpResponse, HttpRequestConfig, HttpRequestDataType } from '../utils/http-utils';
import cacheService from '../services/cache.service';
import Logger from '../utils/logger.utils';
import { CacheConfig, CacheOptions } from '..//entities/cache';
import StringUtils from '../utils/string-utils';
import { SellerDashBoard } from './constant';

class HttpService {
    private headers: any = {
        Accept: 'application/json, text/plain, */*',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/json',
    };
    private readonly JSTATE_IN_HEADER: string = 'jstateInHeader';

    private async getConfigWithPossibleAtcExtraHeader(
        config?: HttpRequestConfig,
        onlyCache?: boolean,
    ): Promise<HttpRequestConfig> {
        const atcExtraHeader: string = onlyCache ? '' : '';
        const config2: HttpRequestConfig = Object.assign(
            {},
            config || {},
            atcExtraHeader ? { headers: Object.assign({}, { atcExtraHeader }, (config || {}).headers || {}) } : {},
        );
        return config2;
    }

    public async get<T = any>(
        url: string,
        ssoToken?: string,
        languageCode?: string,
        httpRequestConfig?: HttpRequestConfig,
        onlyCache?: boolean,
    ): Promise<HttpResponse<T>> {
        const config: HttpRequestConfig = await this.getConfigWithPossibleAtcExtraHeader(httpRequestConfig, onlyCache);
        let config2: HttpRequestConfig = Object.assign({}, config);
        if (ssoToken) {
            let extraHeaders: any = {};
            if (config && !!config.useBrowserLanguageSetting) {
                extraHeaders = {
                    'authorization': 'Bearer ' + SellerDashBoard.NW_ACCESS_TOKEN,
                };

            } else {
                extraHeaders = {
                  'authorization': 'Bearer ' + SellerDashBoard.NW_ACCESS_TOKEN,
                };
            }

            console.log("extraHeaders ==> " , extraHeaders);
            let jstateHeader: HttpRequestConfig = {};
            if (StringUtils.getParamValue(url, this.JSTATE_IN_HEADER) === 'true') {
                jstateHeader = {
                    headers: {
                        _jstate: StringUtils.getParamValue(url, '_jstate'),
                    },
                };
                url = StringUtils.removeParam(url, '_jstate');
                url = StringUtils.removeParam(url, this.JSTATE_IN_HEADER);
            }
            config2 = Object.assign({}, config || {}, {
                url,
                method: 'GET',
                headers: Object.assign(
                    {},
                    this.headers,
                    extraHeaders,
                    (jstateHeader || {}).headers,
                    (config || {}).headers,
                ),
                withCredentials: true,
                crossDomain: true,
            });
        }
        const cacheConfig: CacheConfig = (config2 || {}).cache || new CacheConfig();
        const cacheName: string = cacheConfig.name;
        const cacheKey: string = cacheConfig.key;
        const cacheOptions: CacheOptions = cacheConfig.options;
        if (cacheKey) {
            const responseData: T = await cacheService.getItem<T>(cacheName, cacheKey, cacheOptions);
            if (responseData) {
                Logger.debug(`cache key: ${cacheKey} is retrieved from cache: ${cacheName} `);
                const httpResponse: HttpResponse<T> = new HttpResponse<T>();
                httpResponse.headers = (config2 || {}).headers;
                httpResponse.data = responseData;
                // @ts-ignore
                httpResponse.config = config2;
                return httpResponse;
            }
        }
        if (config2.dataType && config2.dataType === HttpRequestDataType.SCRIPTP) {
            return new Promise<HttpResponse<T>>((resolve, reject) => {
                let script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = config2.url;
                script.async = true;
                document.head.appendChild(script);
                // @ts-ignore
                const onload = () => {
                    // @ts-ignore
                    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                        // @ts-ignore
                        script.onload = null;
                        // @ts-ignore
                        script.onreadystatechange = null;
                        if (script.parentNode) {
                            script.parentNode.removeChild(script);
                        }
                        // @ts-ignore
                        script = null;
                        const httpResponse: HttpResponse = new HttpResponse<T>();
                        httpResponse.status = 200;
                        httpResponse.data = 'OK';
                        resolve(httpResponse);
                    }
                };
                // @ts-ignore
                script.onload = onload;
                // @ts-ignore
                script.onreadystatechange = onload;
                script.onerror = (e: any) => {
                    const msg: string = `Could not load sso script:${script.src}`;
                    const error: any = { msg, original: e };
                    reject(error);
                };
            });
        }
        if (config2.dataType && config2.dataType === HttpRequestDataType.JSONP) {
            config2.adapter = jsonpAdapter;
        }
        const httpResponse: HttpResponse<T> = await httpUtils.get(url, config2);

        if (cacheKey) {
            await cacheService.setItem<T>(cacheName, cacheKey, httpResponse.data, cacheOptions);
            Logger.debug(`cache key: ${cacheKey} is saved to cache: ${cacheName} `);
            return httpResponse;
        }
        return httpResponse;
    }

    public async post<T = any>(
        url: string,
        data: any,
        ssoToken?: string,
        languageCode?: string,
        httpRequestConfig?: HttpRequestConfig,
    ): Promise<HttpResponse<T>> {
        const config: HttpRequestConfig = await this.getConfigWithPossibleAtcExtraHeader(httpRequestConfig);
        let config2: HttpRequestConfig = Object.assign({}, config);
        if (ssoToken) {
            config2 = Object.assign({}, config || {}, {
                url,
                method: 'POST',
                headers: Object.assign(
                    {},
                    this.headers,
                    {
                        'x-openlane-authentication': ssoToken,
                        'Accept-Language': languageCode,
                    },
                    (config || {}).headers,
                ),
                withCredentials: true,
                crossDomain: true,
            });
        }
        const httpResponse: HttpResponse<T> = await httpUtils.post(url, data, config2);
        return httpResponse;
    }
    public async put<T = any>(
        url: string,
        data: any,
        ssoToken?: string,
        languageCode?: string,
        httpRequestConfig?: HttpRequestConfig,
    ): Promise<HttpResponse<T>> {
        const config: HttpRequestConfig = await this.getConfigWithPossibleAtcExtraHeader(httpRequestConfig);

        let config2: HttpRequestConfig = Object.assign({}, config);
        if (ssoToken) {
            config2 = Object.assign({}, config || {}, {
                url,
                method: 'PUT',
                headers: Object.assign(
                    {},
                    this.headers,
                    {
                        'x-openlane-authentication': ssoToken,
                        'Accept-Language': languageCode,
                    },
                    (config || {}).headers,
                ),
                withCredentials: true,
                crossDomain: true,
            });
        }
        const httpResponse: HttpResponse<T> = await httpUtils.put(url, data, config2);
        return httpResponse;
    }
    public async delete(
        url: string,
        ssoToken?: string,
        languageCode?: string,
        httpRequestConfig?: HttpRequestConfig,
    ): Promise<void> {
        const config: HttpRequestConfig = await this.getConfigWithPossibleAtcExtraHeader(httpRequestConfig);
        let config2: HttpRequestConfig = Object.assign({}, config);
        if (ssoToken) {
            config2 = Object.assign({}, config || {}, {
                url,
                method: 'DELETE',
                headers: Object.assign(
                    {},
                    this.headers,
                    {
                        'x-openlane-authentication': ssoToken,
                        'Accept-Language': languageCode,
                    },
                    (config || {}).headers,
                ),
                withCredentials: true,
                crossDomain: true,
            });
        }
        await httpUtils.delete(url, config2);
    }
}

// Export a singleton instance in the global namespace
export default new HttpService();
