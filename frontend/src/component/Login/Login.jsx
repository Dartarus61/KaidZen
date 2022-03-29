import React, { useContext, useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import s from "./Login.module.css"
import { NavLink } from 'react-router-dom';
import { AuthContext } from './../context/context';
import { useInput } from './../hooks/useInput';


const Login = () => {
    // авторизация пользователя
    const { isAuth, setIsAuth } = useContext(AuthContext)

    // запомни меня
    const [checked, setChecked] = useState(false);

    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    //управление инпутами

    const login = useInput("", { isEmpty: true })
    const password = useInput("", { isEmpty: true })

    //отправка формы

    const formSubmit = (e) => {
        e.preventDefault()
        setIsAuth(true)
    }

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <form className={s.form} onSubmit={(e) => formSubmit(e)}>
                    <span className={s.loginText}>Вход</span>
                    <div className={s.input}>
                        <TextField
                            label="Логин"
                            variant="filled"
                            required
                            error={(login.isDirty && login.isEmpty)}
                            value={login.value}
                            onChange={e => login.onChange(e)}
                            onBlur={e => login.onBlur(e)}
                            helperText={(login.isDirty && login.isEmpty) && login.error}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            label="Пароль"
                            variant="filled"
                            required
                            error={(password.isDirty && password.isEmpty)}
                            value={password.value}
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            helperText={(password.isDirty && password.isEmpty) && password.error}
                        />
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
                        <Button type='submit' disabled={!login.inputValid || !password.inputValid} variant="contained" >Войти</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;