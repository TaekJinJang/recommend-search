import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';

const RecommendSearch = ({title}: {title: string}) => {
    return (
        <RecommendItem>
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
    &:hover {
        background-color: rgba(128, 128, 128, 0.1);
    }
    span {
        margin-left: 20px;
    }
`;
