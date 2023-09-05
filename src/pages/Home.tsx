import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';
import {useEffect, useState} from 'react';
import useDebounceInput from 'hooks/useDebounceInput';
import {getRecommendSearch} from 'apis/search';
import {searchItemType} from 'types/search';
import {MAX_RECOMMEND_NUM} from 'constants/api';

const Home = () => {
    const [onfocus, setOnfocus] = useState<boolean>(false);
    const {value, setValue, handleInputChange, debouncedValue} = useDebounceInput();
    const [recommendSearch, setRecommendSearch] = useState<searchItemType[]>([]);
    console.info(value);
    const inputFocus = () => {
        setOnfocus(true);
    };

    useEffect(() => {
        const getSearch = async () => {
            const res = await getRecommendSearch(debouncedValue);
            const sliceRes = res.length > MAX_RECOMMEND_NUM ? res.slice(0, MAX_RECOMMEND_NUM) : res;
            setRecommendSearch(sliceRes);
        };

        getSearch();
    }, [debouncedValue]);
    console.info(recommendSearch);
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
                />
                <button>
                    <AiOutlineSearch size='24' color='#ffffff' />
                </button>
            </SearchContainer>
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
