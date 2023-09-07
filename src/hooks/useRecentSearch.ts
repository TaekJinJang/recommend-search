import {useCallback, useState} from 'react';
import {searchItemType} from 'types/search';

const useRecentSearch = () => {
    const [recentList, setRecentList] = useState([]);

    // 세션 스토리지에서 recentSearches 배열을 가져옵니다.
    const getRecentSearches = useCallback(() => {
        const recentSearches = sessionStorage.getItem('recentSearches');
        const searchList = recentSearches ? JSON.parse(recentSearches) : [];
        setRecentList(searchList);
        return searchList;
    }, []);

    // 새로운 검색어를 추가하고, 최대 7개의 항목만 유지합니다.
    const addNewRecentSearch = (search: string | searchItemType) => {
        if (search === '') return;
        const searchList = getRecentSearches();

        const index = searchList.indexOf(search);
        if (index !== -1) searchList.splice(index, 1);

        // 새로운 검색어를 배열 앞쪽에 추가합니다.
        searchList.unshift(search);

        // 저장된 검색어가 7개를 초과한다면, 가장 오래된 항목(배열 마지막 요소)을 제거합니다.
        if (searchList.length > 7) {
            searchList.pop();
        }

        setRecentList(searchList);

        // 수정된 배열을 다시 JSON 형식으로 변환하여 세션스토리지에 저장합니다.
        sessionStorage.setItem('recentSearches', JSON.stringify(searchList));
    };

    return {recentList, getRecentSearches, addNewRecentSearch};
};

export default useRecentSearch;
