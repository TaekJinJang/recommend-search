import styled from 'styled-components';
import {AiOutlineSearch} from 'react-icons/ai';
import {eventType} from 'types/search';

interface RecommendSearchTypes {
    title: string;
    selected?: boolean;
    onSubmit?: (event: eventType, title: string) => void;
}

const RecommendSearch = ({title, selected = false, onSubmit}: RecommendSearchTypes) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (onSubmit) onSubmit(event, title);
    };
    return (
        <RecommendItem className={selected ? 'selected' : ''} onClick={handleClick}>
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
