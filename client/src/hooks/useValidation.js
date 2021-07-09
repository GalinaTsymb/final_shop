import {useEffect, useState } from 'react';



const UseValidation = (value, validations) => {

    const [minLengthError, setMinLengthError] = useState(false);
    const [emailError, setEmailError]         = useState(false);
    const [textError, setTextError]           = useState(false);
    const [telError, setTelError]             = useState(false);
    const [numError, setNumError]             = useState(false);

    const [message, setMessage] = useState('');
    const [inputValid, setInputValid] = useState(false);

    useEffect(() => {

        for(const validation in validations){
            switch(validation){

                case 'minLength':
                   value.length < validations[validation] ? setMinLengthError (true) : setMinLengthError(false);
                   minLengthError === true ? setMessage(`Пароль не меньше ${validations[validation]}символов`) : setMessage('');
                    break;

                case 'emailError':
                    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    re.test(String(value).toLowerCase()) ? setEmailError(false) : setEmailError(true);
                    emailError === true ? setMessage(`Некорректный email`) : setMessage('');
                    break;
                case 'onlyLetters':
                    const regLetters = /^[\u0400-\u04FF]+$/;
                    regLetters.test(String(value).toLowerCase()) ? setTextError(false) : setTextError(true);
                    textError === true ? setMessage(`Только русские буквы`) : setMessage('');
                    break;
                case 'telValid':
                    const regTel= /^\+?3?8?(0\d{9})$/;
                    regTel.test(value) ? setTelError(false) : setTelError(true);
                    telError === true ? setMessage(`Формат +380000000000`) : setMessage('');
                    break;
                case 'numValid':
                    const regNum = /^\d+$/;
                    regNum.test(value) ? setNumError(false) : setNumError(true);
                    numError === true ? setMessage(`Только цифры`) : setMessage('');
                    break;
            }
        }
    }, [value]);

    useEffect(() => {
        if(minLengthError || emailError || textError || telError || numError){
            setInputValid(false);
        }else{
            setInputValid(true);
        }
    }, [minLengthError, emailError, textError, telError, numError ]);

    return {
        minLengthError,
        emailError,
        textError,
        telError,
        numError,
        inputValid,
        message,
    };
};

export default UseValidation;
