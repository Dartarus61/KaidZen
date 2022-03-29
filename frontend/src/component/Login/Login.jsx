import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import s from "./Login.module.css"
import { NavLink } from 'react-router-dom';
import { useValidateInput } from '../utils/useValidateInput';


const Login = () => {
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const [inputTarget, setInputTarget] = useState({
        login: '',
        password: '',
    })

    const [formError, setFormError] = useState({
        login: { error: false, helperText: "" },
        password: { error: false, helperText: "" },
    })

    const changeinputValue = (e) => {
        setInputTarget({
            ...inputTarget,
            [e.target.id]: e.target.value
        })
    }

    const {error: errorLogin, validateError: validateLogin} = useValidateInput(() => inputTarget.login === '')
    const {error: errorPassword, validateError: validatePassword} = useValidateInput(() => inputTarget.password === '')

    const isValidForm = () => {
        validateLogin();
        validatePassword();
    }

    const pushForm = () => {
    }

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <form className={s.form}>
                    <span className={s.loginText}>Вход</span>
                    <div className={s.input}>
                        <TextField error={errorLogin} id="login" name="login" label="Логин" variant="filled" value={inputTarget.login} onChange={changeinputValue} helperText={formError.login.helperText} required />
                    </div>
                    <div className={s.input}>
                        <TextField error={errorPassword} id="password" name="password" label="Пароль" variant="filled" value={inputTarget.password} onChange={changeinputValue} helperText={formError.password.helperText} required />
                    </div>
                    <div className={s.toolsPassword}>
                        <div>
                            <Checkbox
                                checked={checked}
                                onChange={handleChange}
                                inputProps={{ 'aria-label': 'controlled' }}
                                id="checkBoxLogin"
                            />
                            <label for="checkBoxLogin">Запомнить меня</label>
                        </div>
                        <a href="#">Забыли пароль?</a>
                    </div>
                    <div className={s.containerButton}>
                        <NavLink to="/register" style={{ textDecoration: "none" }}>
                            <Button variant="text">Регистрация</Button>
                        </NavLink>
                        <Button variant="contained" onClick={isValidForm}>Войти</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;