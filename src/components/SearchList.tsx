import {eventType, searchItemType} from 'types/search';
import RecommendSearch from './RecommendSearch';
import styled from 'styled-components';
import LoadingSpinner from './LoadingSpinner';

interface SearchListProps {
    title: string;
    searchList: [] | searchItemType[];
    isLoading: boolean;
    selected: number;
    onSubmit(event: eventType, search: string): void;
}

const SearchList = ({title, searchList, isLoading, selected, onSubmit}: SearchListProps) => {
    return (
        <>
            <RecommendSearch title={title} />
            <SectionTitle>{title ? '추천 검색어' : '최근 검색어'}</SectionTitle>
            {isLoading && <LoadingSpinner />}
            {searchList.length !== 0 &&
                !isLoading &&
                searchList.map((search, index) => (
                    <RecommendSearch
                        key={index}
                        title={typeof search === 'string' ? search : search.sickNm}
                        selected={selected === index}
                        onSubmit={onSubmit}
                    />
                ))}
            {searchList.length === 0 && <div className='noRecommend'>검색어 없음</div>}
        </>
    );
};
export default SearchList;

const SectionTitle = styled.div`
    padding: 0 20px;
    margin: 6px 0;
    font-size: 14px;
    font-weight: 700;
    color: #53585d;
`;
