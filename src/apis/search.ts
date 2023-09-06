import {instance} from 'apis/instasnce';
import * as cacheStorage from 'utils/cacheStorage';

export const getRecommendSearch = async (search: string) => {
    const cachedResponse = await cacheStorage.getCache(search);
    if (cachedResponse) return cachedResponse.json();
    // json-server 라이브러리 지원 쿼리 파라미터 사용
    const response = await instance.get(`/sick?sickNm_like=${search}`);
    if (response.data.length > 0) await cacheStorage.setCache(search, response.data);
    return response.data;
};
