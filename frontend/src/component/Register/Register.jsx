import React, { useState } from 'react';
import s from "./Register.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useValidateInput } from '../utils/useValidateInput';

const Register = () => {
    const [inputTarget, setInputTarget] = useState({
        surname: '',
        name: '',
        middleName: '',
        numberGroup: '',
        login: '',
        password: '',
        repeatPassword: '',
    })

    const { error: errorSurname, validateError: validateSurname } = useValidateInput(() => inputTarget.surname === '')
    const { error: errorName, validateError: validateName } = useValidateInput(() => inputTarget.name === '')
    const { error: errorMiddleName, validateError: validateMiddleName } = useValidateInput(() => inputTarget.middleName === '')
    const { error: errorNumberGroup, validateError: validateNumberGroup } = useValidateInput(() => inputTarget.numberGroup === '')
    const { error: errorLogin, validateError: validateLogin } = useValidateInput(() => inputTarget.login === '')
    const { error: errorPassword, validateError: validatePassword } = useValidateInput(() => inputTarget.password === '')
    const { error: errorRepeatPassword, validateError: validateRepeatPassword } = useValidateInput(() => inputTarget.repeatPassword === '')

    const isValidForm = () => {
        validateSurname();
        validateName();
        validateMiddleName();
        validateNumberGroup();
        validateLogin();
        validatePassword();
        validateRepeatPassword();
    }

    const changeinputValue = (e) => {
        setInputTarget({
            ...inputTarget,
            [e.target.id]: e.target.value
        })
    }

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <form className={s.form}>
                    <span className={s.loginText}>Регистрация</span>
                    <div className={s.input}>
                        <TextField error={errorSurname} id="surname" label="Фамилия" variant="filled" value={inputTarget.surname} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorName} id="name" label="Имя" variant="filled" value={inputTarget.name} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorMiddleName} id="middleName" label="Отчество" variant="filled" value={inputTarget.middleName} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorNumberGroup} id="numberGroup" label="Номер рабочей группы" variant="filled" value={inputTarget.numberGroup} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorLogin} id="login" label="Логин" variant="filled" value={inputTarget.login} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorPassword} id="password" label="Пароль" variant="filled" value={inputTarget.password} onChange={changeinputValue} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorRepeatPassword} id="repeatPassword" label="Повторите пароль" variant="filled" value={inputTarget.repeatPassword} onChange={changeinputValue} required />
                    </div>
                    <div className={s.containerButton}>
                        <NavLink to="/login" style={{ textDecoration: "none" }}>
                            <Button variant="text">Назад</Button>
                        </NavLink>
                        <Button variant="contained" onClick={isValidForm}>Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;