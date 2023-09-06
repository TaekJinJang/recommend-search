import {instance} from 'apis/instasnce';
import * as cacheStorage from 'utils/cacheStorage';

export const getRecommendSearch = async (search: string) => {
    const cachedResponse = await cacheStorage.getCache(search);
    if (cachedResponse) return cachedResponse.json();
    const response = await instance.get(`/sick?q=${search}`);
    if (response.data.length > 0) await cacheStorage.setCache(search, response.data);
    return response.data;
};
