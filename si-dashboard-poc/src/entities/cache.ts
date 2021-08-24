class CacheConfig {
    name: string;
    key: string;
    options?: CacheOptions;
}

class CacheOptions {
    cacheKeepOneKeyOnly?: boolean = false;
    forceUpdate?: boolean = false;
    timeToLive?: number = -1;
}

class CacheItem<T> {
    target: T;
    created: number;
    updated: number;
    createdStr: string;
    updatedStr: string;
    timeToLive: number = -1;
}

export { CacheConfig, CacheItem, CacheOptions };
