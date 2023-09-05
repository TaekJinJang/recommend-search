import {ChangeEvent, Dispatch, SetStateAction, useEffect, useState} from 'react';

interface returnTypes {
    value: string;
    setValue: Dispatch<SetStateAction<string>>;
    handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
    debouncedValue: string;
}

const useDebounceInput = (): returnTypes => {
    const [value, setValue] = useState('');
    const [debouncedValue, setDebouncedValue] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setDebouncedValue(value);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [value]);

    return {value, setValue, handleInputChange, debouncedValue};
};
export default useDebounceInput;
