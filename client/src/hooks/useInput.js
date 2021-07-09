import React, {useState} from 'react';
import UseValidation from "./useValidation";



const useInput = (initialValue, validations = {}) => {

    const [value, setValue] = useState(initialValue);
    const [isDirty, setIsDirty] = useState(false);
    const valid = UseValidation(value, validations);


    const onChange = (e) => {
        setValue(e.target.value);
    };

    const onBlur = (e) => {
        setIsDirty(true);
    };

    const clearValue = () => {
        setValue('');
    };

    return {
        value, isDirty,
        clearValue,
        onChange,
        onBlur,
        ...valid
    };
};

export default useInput;
