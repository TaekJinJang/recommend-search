import {getRecommendSearch} from 'apis/search';
import {MAX_RECOMMEND_NUM} from 'constants/constants';
import {useCallback, useState} from 'react';
import {searchItemType} from 'types/search';
import * as cacheStorage from 'utils/cacheStorage';
import {replaceValidKeyword} from 'utils/regex';

const useRecsSearch = () => {
    const [recsSearchList, setRecsSearchList] = useState<searchItemType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getRecsSearch = useCallback(async (search: string) => {
        try {
            setIsLoading(true);
            const regexSearch = replaceValidKeyword(search);
            if (regexSearch.length > 0) {
                const cachedResponse = await cacheStorage.getCache(regexSearch);
                const res = cachedResponse
                    ? await cachedResponse.json()
                    : await getRecommendSearch(regexSearch);
                const sliceRes =
                    res.length > MAX_RECOMMEND_NUM ? res.slice(0, MAX_RECOMMEND_NUM) : res;
                if (!cachedResponse) await cacheStorage.setCache(regexSearch, sliceRes);
                setRecsSearchList(sliceRes);
            } else setRecsSearchList([]);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    return {recsSearchList, isLoading, getRecsSearch};
};

export default useRecsSearch;
