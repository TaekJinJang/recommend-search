import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';
import {useEffect, useRef, useState} from 'react';
import useDebounceInput from 'hooks/useDebounceInput';
import RecommendSearch from 'components/RecommendSearch';
import useRecsSearch from 'hooks/useRecsSearch';
import LoadingSpinner from 'components/LoadingSpinner';
import {eventType, searchItemType} from 'types/search';
import useRecentSearch from 'hooks/useRecentSearch';

const Home = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const {value, setValue, handleInputChange, debouncedValue} = useDebounceInput();
    const [selected, setSelected] = useState(-1);
    const {recsSearchList, isLoading, getRecsSearch} = useRecsSearch();
    const {recentList, getRecentSearches, addNewRecentSearch} = useRecentSearch();
    useEffect(() => {
        getRecentSearches();
    }, [getRecentSearches]);
    const inputFocus = () => setOnFocus(true);

    const onSubmit = (event: eventType, str?: string | searchItemType) => {
        event.preventDefault();
        if (!str && value === '') alert('검색어를 입력해주세요');
        setValue('');
        addNewRecentSearch(str || value);
    };

    const searchRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setOnFocus(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        getRecsSearch(debouncedValue);
    }, [debouncedValue, getRecsSearch]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onFocus) {
            const searchList = value ? recsSearchList : recentList;
            const lastIndex = value ? recsSearchList.length - 1 : recentList.length - 1;
            switch (event.key) {
                case 'ArrowDown':
                    if (searchList.length - 1 > selected) setSelected(prev => prev + 1);
                    if (lastIndex === selected) setSelected(0);
                    break;
                case 'ArrowUp':
                    if (selected === 0) setSelected(lastIndex);
                    else setSelected(prev => prev - 1);
                    break;
                case 'Enter':
                    if (selected >= 0) {
                        if (value) onSubmit(event, searchList[selected].sickNm);
                        else onSubmit(event, searchList[selected]);
                        setSelected(-1);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    return (
        <HomeContainer>
            <HomeHeader>
                국내 모든 임상실험 검색하고
                <br />
                온라인으로 참여하기
            </HomeHeader>
            <section ref={searchRef}>
                <SearchContainer onSubmit={onSubmit}>
                    <AiOutlineSearch size='24' color='#000000' />

                    <input
                        type='text'
                        value={value}
                        onChange={handleInputChange}
                        placeholder='질환명을 입력해 주세요.'
                        onFocus={inputFocus}
                        onKeyDown={handleKeyDown}
                    />
                    <button>
                        <AiOutlineSearch size='24' color='#ffffff' />
                    </button>
                </SearchContainer>
                {onFocus && (
                    <RecommendContainer>
                        {value ? (
                            <>
                                <RecommendSearch title={value} />
                                <SectionTitle>추천 검색어</SectionTitle>
                                {isLoading && <LoadingSpinner />}
                                {recsSearchList.length !== 0 &&
                                    !isLoading &&
                                    recsSearchList.map((search, index) => {
                                        return (
                                            <RecommendSearch
                                                key={search.sickCd}
                                                title={search.sickNm}
                                                selected={selected === index}
                                                onSubmit={onSubmit}
                                            />
                                        );
                                    })}
                                {recsSearchList.length === 0 && (
                                    <div className='noRecommend'>검색어 없음</div>
                                )}
                            </>
                        ) : (
                            <>
                                <SectionTitle>최근 검색어</SectionTitle>
                                {recentList.length !== 0 ? (
                                    recentList.map((search, index) => {
                                        return (
                                            <RecommendSearch
                                                key={index}
                                                title={search}
                                                selected={selected === index}
                                                onSubmit={onSubmit}
                                            />
                                        );
                                    })
                                ) : (
                                    <div className='noRecommend'>검색어 없음</div>
                                )}
                            </>
                        )}
                    </RecommendContainer>
                )}
            </section>
        </HomeContainer>
    );
};

export default Home;

const HomeContainer = styled.main`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 200px;
`;
const HomeHeader = styled.h1`
    text-align: center;
    font-size: 40px;
    font-weight: 800;
    line-height: 1.6;
    margin-bottom: 20px;
`;
const SearchContainer = styled.form`
    width: 490px;
    height: 50px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    padding: 10px 10px 10px 25px;
    border-radius: 50px;
    border: none;
    input {
        width: 100%;
        border: none;
        margin-left: 10px;
        font-size: 17px;
        outline: none;
    }
    button {
        border: none;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        background-color: #007be9;
        cursor: pointer;
    }
`;

const RecommendContainer = styled.div`
    padding: 20px 0;
    margin-top: 5px;
    width: 490px;
    border-radius: 15px;
    background-color: #ffffff;
    .noRecommend {
        text-align: center;
        color: #a7afb7;
    }
`;

const SectionTitle = styled.div`
    padding: 0 20px;
    margin: 6px 0;
    font-size: 14px;
    font-weight: 700;
    color: #53585d;
`;
