import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import s from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "./../context/context";
import { useInput } from "./../hooks/useInput";
import InputList from "../InputList/InputList";

const Login = () => {
  // авторизация пользователя
  const { setIsAuth } = useContext(AuthContext);

  // запомни меня
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //управление инпутами

  const login = useInput("", { isEmpty: true, email: true });
  const password = useInput("", { isEmpty: true });

  //отправка формы

  const formSubmit = (e) => {
    e.preventDefault();
    setIsAuth(true);
  };

  const propsList = [
    {
      label: "Почта",
      error: login.isDirty && (login.isEmpty || login.emailError) ,
      value: login.value,
      onChange: (e) => login.onChange(e),
      onBlur: (e) => login.onBlur(e),
      helperText: login.isDirty && (login.isEmpty || login.emailError) && login.error,
    },
    {
      label: "Пароль",
      error: password.isDirty && password.isEmpty,
      value: password.value,
      onChange: (e) => password.onChange(e),
      onBlur: (e) => password.onBlur(e),
      helperText: password.isDirty && password.isEmpty && password.error,
    },
  ];

  return (
    <div className={s.container}>
      <div className={s.wrap}>
        <form className={s.form} onSubmit={(e) => formSubmit(e)}>
          <span className={s.loginText}>Вход</span>
          <InputList props={propsList} />
          <div className={s.toolsPassword}>
            <div>
              <Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
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
            <Button
              type="submit"
              disabled={!login.inputValid || !password.inputValid}
              variant="contained"
            >
              Войти
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
