import React, { useState, useEffect } from 'react';


const useValidation = (value, validations) => {

    const [isEmpty, setIsEmpty] = useState(true)
    const [minLength, setMinLength] = useState(false)
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
            }
        }
    }, [value])

    useEffect(() => {
        if (isEmpty || minLength) {
            setInputValid(false)
        }
        else {
            setInputValid(true)
        }
    }, [isEmpty, minLength])

    useEffect(() => {
        for (const validation in validations) {
            if (isEmpty){
                setError("Поле не может быть пустым")
                break;
            }
            else{
                setError("")
            }
            switch (validation) {
                case "minLength":
                    if(value.length < validations[validation]){
                        setError("Длинна мала")
                    } else{
                        setError("");
                    } 
                    break;
            }
        }
    }, [isEmpty, minLength])

    return {
        isEmpty,
        minLength,
        inputValid,
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
