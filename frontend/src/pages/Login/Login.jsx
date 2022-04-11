import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import s from "./Login.module.css";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../items/context/context";
import { useInput } from "../../items/hooks/useInput";
import InputList from "../../components/InputList/InputList";
import axios from "axios";
import Loader from "../../UI/Loader/Loader";
import Alert from "@mui/material/Alert";

const Login = () => {
  // авторизация пользователя
  const { setIsAuth } = useContext(AuthContext);

  // запомни меня
  const [checked, setChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState({
    test: false,
    text: "",
  });

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  //управление инпутами

  const login = useInput("", { isEmpty: true, email: true });
  const password = useInput("", { isEmpty: true });

  //отправка формы

  const formSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("/api/login", {
        login: login.value,
        password: password.value,
      })
      .then(function (response) {
        setIsAuth({
          auth: true,
          role: response.data.user.role,
          data: {
            id: response.data.user.id,
            name: response.data.user.name,
            surname: response.data.user.surname,
            secondName: response.data.user.secondname,
            numberGroup: response.data.user.group,
            token: response.data.accsessToken,
          },
        });
        localStorage.setItem(
          "auth",
          JSON.stringify({
            auth: true,
            role: response.data.user.role,
            data: {
              id: response.data.user.id,
              name: response.data.user.name,
              surname: response.data.user.surname,
              secondName: response.data.user.secondname,
              numberGroup: response.data.user.group,
              token: response.data.accsessToken,
            },
          })
        );
        setIsLoading(false);
      })
      .catch(function (error) {
        setFetchError({
          test: true,
          text: error.message,
        });
      })
      .finally(function (error) {
        setIsLoading(false);
      });
  };

  const propsList = [
    {
      label: "Почта",
      error: login.isDirty && (login.isEmpty || login.emailError),
      value: login.value,
      onChange: (e) => login.onChange(e),
      onBlur: (e) => login.onBlur(e),
      helperText:
        login.isDirty && (login.isEmpty || login.emailError) && login.error,
    },
    {
      label: "Пароль",
      error: password.isDirty && password.isEmpty,
      value: password.value,
      type: "password",
      autoComplete: "current-password",
      onChange: (e) => password.onChange(e),
      onBlur: (e) => password.onBlur(e),
      helperText: password.isDirty && password.isEmpty && password.error,
    },
  ];

  return (
    <div className={s.container}>
      {isLoading && <Loader />}
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
        {fetchError.test &&
          (fetchError.text == "Request failed with status code 400" ? (
            <Alert severity="error">"Логин или пароль указаны неверно"</Alert>
          ) : (
            <Alert severity="error">"Что-то пошло не так"</Alert>
          ))}
      </div>
    </div>
  );
};

export default Login;
