import {searchItemType} from 'types/search';
import {EXPIRE_TIME} from 'constants/constants';

const isExpired = (cacheResponse?: Response) => {
    const cachedDate = cacheResponse?.headers.get('SET_DATE');

    if (!cachedDate) return;
    const fetchDate = new Date(cachedDate).getTime();
    const now = new Date().getTime();

    return now - fetchDate > EXPIRE_TIME;
};

export const getCache = async (value: string) => {
    const cache = await caches.open('search-cache');
    const response = await cache.match(value);
    if (response) {
        if (isExpired(response)) {
            const request = new Request(value);
            await cache.delete(request);
            return null;
        } else {
            return response;
        }
    }
    return null;
};

export const setCache = async (value: string, data: searchItemType[]) => {
    const cache = await caches.open('search-cache');
    const header = new Headers();
    header.append('SET_DATE', new Date().toISOString());
    const response = new Response(JSON.stringify(data), {headers: header});
    cache.put(value, response);
};
