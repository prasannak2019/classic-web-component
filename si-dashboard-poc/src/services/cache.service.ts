import localforage from 'localforage';
import { CacheItem, CacheOptions } from '../entities/cache';

const config = {
    driver: localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name: '__adesa.api.cache__',
    version: 1.0,
    size: 1000980736, // Size of database, in bytes. WebSQL-only for now.
    storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description: 'adesa gui cache',
};

class CacheService {
    private cacheInstanceMap: Map<string, LocalForage> = new Map<string, LocalForage>();

    public getCache(cacheName: string): LocalForage {
        let lf = this.cacheInstanceMap.get(cacheName);
        if (!lf) {
            const config2: any = Object.assign({}, config, { storeName: cacheName });
            lf = localforage.createInstance(config2);
            this.cacheInstanceMap.set(cacheName, lf);
        }
        return lf;
    }

    public async getItem<T>(cacheName: string, cacheKey: string, cacheOptions?: CacheOptions): Promise<T> {
        const forceUpdate: boolean = (cacheOptions || { forceUpdate: false }).forceUpdate;
        const timeToLive: number = (cacheOptions || { timeToLive: -1 }).timeToLive || -1;
        if (forceUpdate) {
            await this.removeItem(cacheName, cacheKey);
            return null;
        }
        const localForage: LocalForage = this.getCache(cacheName);
        const cacheItem: CacheItem<T> = await localForage.getItem<CacheItem<T>>(cacheKey);
        let result: T = null;
        if (cacheItem) {
            const cacheCreated: number = cacheItem.created;
            if (timeToLive > 0) {
                if (!cacheCreated) {
                    return null;
                }
                const timeToLiveInSecond = timeToLive * 1000;
                const expireTime = cacheCreated + timeToLiveInSecond;
                if (expireTime < new Date().getTime()) {
                    await this.removeItem(cacheName, cacheKey);
                    return null;
                }
            }
            result = cacheItem.target;
        }
        return result;
    }

    public async setItem<T>(
        cacheName: string,
        cacheKey: string,
        cacheValue: T,
        cacheOptions?: CacheOptions,
    ): Promise<T> {
        const cacheKeepOneKeyOnly: boolean = (cacheOptions || { cacheKeepOneKeyOnly: true }).cacheKeepOneKeyOnly;
        const timeToLive: number = (cacheOptions || { timeToLive: -1 }).timeToLive || -1;
        if (cacheKeepOneKeyOnly) {
            await this.clear(cacheName);
        }
        const localForage: LocalForage = this.getCache(cacheName);
        const cacheItem: CacheItem<T> = new CacheItem<T>();
        cacheItem.target = cacheValue;
        const now: Date = new Date();
        const nowTime = now.getTime();
        cacheItem.created = nowTime;
        cacheItem.updated = nowTime;
        cacheItem.createdStr = `${now}`;
        cacheItem.updatedStr = `${now}`;
        cacheItem.timeToLive = timeToLive;
        const result: CacheItem<T> = await localForage.setItem<CacheItem<T>>(cacheKey, cacheItem);
        return result.target;
    }

    public async removeItem(cacheName: string, cacheKey: string): Promise<void> {
        const localForage: LocalForage = this.getCache(cacheName);
        await localForage.removeItem(cacheKey);
    }
    public async clear(cacheName: string): Promise<void> {
        const localForage: LocalForage = this.getCache(cacheName);
        await localForage.clear();
    }

    public async clearAll(): Promise<void> {
        this.cacheInstanceMap.forEach(async (localForage: LocalForage) => {
            await localForage.clear();
        });
    }
}
const cacheService: CacheService = new CacheService();
export default cacheService;
