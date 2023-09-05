import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';
import {useEffect, useState} from 'react';
import useDebounceInput from 'hooks/useDebounceInput';
import {getRecommendSearch} from 'apis/search';
import {searchItemType} from 'types/search';
import {MAX_RECOMMEND_NUM} from 'constants/api';
import RecommendSearch from 'components/RecommendSearch';

const Home = () => {
    const [onFocus, setOnFocus] = useState<boolean>(false);
    const {value, setValue, handleInputChange, debouncedValue} = useDebounceInput();
    const [recommendSearchArr, setRecommendSearchArr] = useState<searchItemType[]>([]);
    const [selected, setSelected] = useState(-1);
    const inputFocus = () => {
        if (onFocus === true) setSelected(-1);
        setOnFocus(prev => !prev);
    };

    useEffect(() => {
        const getSearch = async () => {
            const res = await getRecommendSearch(debouncedValue);
            const sliceRes = res.length > MAX_RECOMMEND_NUM ? res.slice(0, MAX_RECOMMEND_NUM) : res;
            setRecommendSearchArr(sliceRes);
        };

        getSearch();
    }, [debouncedValue]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (onFocus && recommendSearchArr.length > 0) {
            const lastIndex = recommendSearchArr.length - 1;
            switch (event.key) {
                case 'ArrowDown':
                    if (recommendSearchArr.length - 1 > selected) setSelected(prev => prev + 1);
                    if (lastIndex === selected) setSelected(0);
                    break;
                case 'ArrowUp':
                    if (selected === 0) setSelected(lastIndex);
                    else setSelected(prev => prev - 1);
                    break;
                case 'Enter':
                    event.preventDefault();
                    if (selected >= 0) {
                        setValue(recommendSearchArr[selected].sickNm);
                        setSelected(-1);
                    }
                    break;
                default:
                    break;
            }
        }
    };

    console.info(recommendSearchArr);
    return (
        <HomeContainer>
            <HomeHeader>
                국내 모든 임상실험 검색하고
                <br />
                온라인으로 참여하기
            </HomeHeader>
            <SearchContainer>
                <AiOutlineSearch size='24' color='#000000' />

                <input
                    type='text'
                    value={value}
                    onChange={handleInputChange}
                    placeholder='질환명을 입력해 주세요.'
                    onFocus={inputFocus}
                    onBlur={inputFocus}
                    onKeyDown={handleKeyDown}
                />
                <button>
                    <AiOutlineSearch size='24' color='#ffffff' />
                </button>
            </SearchContainer>
            {onFocus && (
                <RecommendContainer>
                    <RecommendSearch title={value} />
                    <SectionTitle>추천 검색어</SectionTitle>
                    {recommendSearchArr.length !== 0 ? (
                        recommendSearchArr.map((search, index) => {
                            return (
                                <RecommendSearch
                                    key={search.sickCd}
                                    title={search.sickNm}
                                    selected={selected === index}
                                />
                            );
                        })
                    ) : (
                        <div className='noRecommend'>검색어 없음</div>
                    )}
                </RecommendContainer>
            )}
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
