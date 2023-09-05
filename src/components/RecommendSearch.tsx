import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';

interface RecommendSearchTypes {
    title: string;
    selected?: boolean;
}

const RecommendSearch = ({title, selected = false}: RecommendSearchTypes) => {
    return (
        <RecommendItem className={selected ? 'selected' : ''}>
            <AiOutlineSearch size='24' color='#000000' />
            <span>{title}</span>
        </RecommendItem>
    );
};

export default RecommendSearch;

const RecommendItem = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    font-weight: 600;
    cursor: pointer;
    &:hover,
    &.selected {
        background-color: rgba(128, 128, 128, 0.1);
    }
    span {
        margin-left: 20px;
    }
`;
