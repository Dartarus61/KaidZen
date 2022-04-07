import React, { useState, useEffect } from 'react';


const useValidation = (value, validations) => {

    const [isEmpty, setIsEmpty] = useState(true)
    const [minLength, setMinLength] = useState(false)
    const [emailError, setEmailError] = useState (false)
    const [inputValid, setInputValid] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    value ? setIsEmpty(false) : setIsEmpty(true)
                    break;
                case "minLength":
                    value.length < validations[validation] ? setMinLength(true) : setMinLength(false)
                    break;
                case "email":
                    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                    !re.test(String(value).toLowerCase()) ? setEmailError(true) : setEmailError(false)
                    break;      
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLength || emailError) {
            setInputValid(false)
        }
        else {
            setInputValid(true)
        }
    }, [isEmpty, minLength, emailError])

    useEffect(() => {
        for (const validation in validations) {
            switch (validation) {
                case "isEmpty":
                    if (isEmpty){
                        setError("Поле не может быть пустым")
                        return;
                    }
                    else{
                        setError("")
                    }
                case "minLength":
                    if(value.length < validations[validation]){
                        setError(`Длинна поля не может быть меньше ${validations[validation]} символов`)
                    } else{
                        setError("");
                    } 
                    break;
                case "email":
                    emailError ? setError("Почта указана неверно") :  setError("")
                    break;   
            }
        }
    }, [isEmpty, minLength, emailError])

    return {
        isEmpty,
        minLength,
        inputValid,
        emailError,
        error,
    }
}

export const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [isDirty, setIsDirty] = useState(false)
    const valid = useValidation(value, validations)
    const onChange = (e) => {
        setValue(e.target.value)
    }

    const onBlur = (e) => {
        setIsDirty(true)
    }

    return {
        value,
        onChange,
        onBlur,
        isDirty,
        ...valid
    }
}
