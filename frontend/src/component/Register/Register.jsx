import React, { useContext, useEffect, useState } from 'react';
import s from "./Register.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Navigate, NavLink } from 'react-router-dom';
import { useInput } from '../hooks/useInput';
import { AuthContext } from '../context/context';

const Register = () => {
    const { setIsAuth } = useContext(AuthContext)

    const surname = useInput("", { isEmpty: true })
    const name = useInput("", { isEmpty: true })
    const secondName = useInput("", { isEmpty: true })
    const numberGroup = useInput("", { isEmpty: true })
    const login = useInput("", { isEmpty: true })
    const password = useInput("", { isEmpty: true, minLength: 8 })
    const repeatPassword = useInput("", { isEmpty: true, minLength: 8 })
    const [passwordError, setPasswordError] = useState(false)

    useEffect(() => {
        if ((password.value !== repeatPassword.value) && (password.value.length >= 8) && (repeatPassword.value.length >= 8)) {
            setPasswordError(true)
        }
        else {
            setPasswordError(false)
        }
    }, [password.value, repeatPassword.value])

    const testPassword = () => {
        if (password.isDirty && (password.isEmpty || password.minLength)) {
            return password.error
        }
        if (passwordError) {
            return "Пароли не совпадают"
        }
        else {
            return ""
        }
    }

    const testRepeatPassword = () => {
        if (repeatPassword.isDirty && (repeatPassword.isEmpty || repeatPassword.minLength)) {
            return repeatPassword.error
        }
        if (passwordError) {
            return "Пароли не совпадают"
        }
        else {
            return ""
        }
    }

    const isValid = () => {
        if (surname.inputValid && name.inputValid && secondName.inputValid && numberGroup.inputValid && login.inputValid && password.inputValid && repeatPassword.inputValid && !passwordError) {
            return false
        }
        else {
            return true
        }
    }

    //поздно исправляется
    const pushForm = (e) => {
        e.preventDefault()
        setIsAuth({
            auth: true,
            role: "user",
            data: {
                name: name.value,
                surname: surname.value,
                secondName: secondName.value,
                numberGroup: numberGroup.value,
            }
        })
    }

    return (
        <div className={s.container}>
            <div className={s.wrap}>
                <form className={s.form} onSubmit={e => pushForm(e)}>
                    <span className={s.loginText}>Регистрация</span>
                    <div className={s.input}>
                        <TextField
                            label="Фамилия"
                            variant="filled"
                            required
                            error={(surname.isDirty && surname.isEmpty)}
                            value={surname.value}
                            onChange={e => surname.onChange(e)}
                            onBlur={e => surname.onBlur(e)}
                            helperText={(surname.isDirty && surname.isEmpty) && surname.error}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            label="Имя"
                            variant="filled"
                            required
                            error={(name.isDirty && name.isEmpty)}
                            value={name.value}
                            onChange={e => name.onChange(e)}
                            onBlur={e => name.onBlur(e)}
                            helperText={(name.isDirty && name.isEmpty) && name.error}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            label="Отчество"
                            variant="filled"
                            required
                            error={(secondName.isDirty && secondName.isEmpty)}
                            value={secondName.value}
                            onChange={e => secondName.onChange(e)}
                            onBlur={e => secondName.onBlur(e)}
                            helperText={(secondName.isDirty && secondName.isEmpty) && secondName.error}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            label="Номер рабочей группы"
                            variant="filled"
                            required
                            error={(numberGroup.isDirty && numberGroup.isEmpty)}
                            value={numberGroup.value}
                            onChange={e => numberGroup.onChange(e)}
                            onBlur={e => numberGroup.onBlur(e)}
                            helperText={(numberGroup.isDirty && numberGroup.isEmpty) && numberGroup.error}
                        />
                    </div>
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
                            error={testPassword()}
                            value={password.value}
                            onChange={e => password.onChange(e)}
                            onBlur={e => password.onBlur(e)}
                            helperText={testPassword()}
                        />
                    </div>
                    <div className={s.input}>
                        <TextField
                            label="Повторите пароль"
                            variant="filled"
                            required
                            error={testRepeatPassword()}
                            value={repeatPassword.value}
                            onChange={e => repeatPassword.onChange(e)}
                            onBlur={e => repeatPassword.onBlur(e)}
                            helperText={testRepeatPassword()}
                        />
                    </div>
                    <div className={s.containerButton}>
                        <NavLink to="/login" style={{ textDecoration: "none" }}>
                            <Button variant="text">Назад</Button>
                        </NavLink>
                        <Button type="submit" disabled={isValid()} variant="contained" >Зарегистрироваться</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Register;