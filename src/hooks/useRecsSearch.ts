import {getRecommendSearch} from 'apis/search';
import {MAX_RECOMMEND_NUM} from 'constants/constants';
import {useCallback, useState} from 'react';
import {searchItemType} from 'types/search';
import * as cacheStorage from 'utils/cacheStorage';

const useRecsSearch = () => {
    const [recsSearchList, setRecsSearchList] = useState<searchItemType[]>([]);

    const getRecsSearch = useCallback(async (search: string) => {
        const isKoreanJamo = (str: string) => /[ㄱ-ㅎㅏ-ㅣ]/.test(str);
        if (!isKoreanJamo(search) && search.length > 0) {
            const cachedResponse = await cacheStorage.getCache(search);
            const res = cachedResponse
                ? await cachedResponse.json()
                : await getRecommendSearch(search);
            const sliceRes = res.length > MAX_RECOMMEND_NUM ? res.slice(0, MAX_RECOMMEND_NUM) : res;
            if (!cachedResponse) await cacheStorage.setCache(search, sliceRes);
            setRecsSearchList(sliceRes);
        } else setRecsSearchList([]);
    }, []);
    return {recsSearchList, getRecsSearch};
};

export default useRecsSearch;
