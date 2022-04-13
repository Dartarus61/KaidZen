import React, { useContext, useEffect, useState } from "react";
import s from "./Register.module.css";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import { useInput } from "../../items/hooks/useInput";
import { AuthContext } from "../../items/context/context";
import InputList from "../../components/InputList/InputList";
import axios from "axios";
import Loader from "../../UI/Loader/Loader";
import Alert from "@mui/material/Alert";

const Register = () => {
  const { setIsAuth } = useContext(AuthContext);
  const surname = useInput("", { isEmpty: true });
  const name = useInput("", { isEmpty: true });
  const secondName = useInput("", { isEmpty: true });
  const numberGroup = useInput("", { isEmpty: true });
  const login = useInput("", { isEmpty: true, email: true });
  const password = useInput("", { isEmpty: true, minLength: 8 });
  const repeatPassword = useInput("", { isEmpty: true, minLength: 8 });
  const [passwordError, setPasswordError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState({
    test: false,
    text: "",
  });

  useEffect(() => {
    if (
      password.value !== repeatPassword.value &&
      password.value.length >= 8 &&
      repeatPassword.value.length >= 8
    ) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  }, [password.value, repeatPassword.value]);

  const testPassword = () => {
    if (password.isDirty && (password.isEmpty || password.minLength)) {
      return password.error;
    }
    if (passwordError) {
      return "Пароли не совпадают";
    } else {
      return "";
    }
  };

  const testRepeatPassword = () => {
    if (
      repeatPassword.isDirty &&
      (repeatPassword.isEmpty || repeatPassword.minLength)
    ) {
      return repeatPassword.error;
    }
    if (passwordError) {
      return "Пароли не совпадают";
    } else {
      return "";
    }
  };

  const isValid = () => {
    if (
      surname.inputValid &&
      name.inputValid &&
      secondName.inputValid &&
      numberGroup.inputValid &&
      login.inputValid &&
      password.inputValid &&
      repeatPassword.inputValid &&
      !passwordError
    ) {
      return false;
    } else {
      return true;
    }
  };

  //поздно исправляется
  const pushForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await axios
      .post("/api/register", {
        surname: surname.value,
        name: name.value,
        secondname: secondName.value,
        group: numberGroup.value,
        login: login.value,
        password: password.value,
      })
      .then(function (response) {
        setIsAuth({
          auth: true,
          role: response.data.user.role,
          data: {
            id: response.data.user.id,
            area: response.data.user.area_of_improvement,
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
              area: response.data.user.area_of_improvement,
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
      label: "Фамилия",
      error: surname.isDirty && surname.isEmpty,
      value: surname.value,
      onChange: (e) => surname.onChange(e),
      onBlur: (e) => surname.onBlur(e),
      helperText: surname.isDirty && surname.isEmpty && surname.error,
    },
    {
      label: "Имя",
      error: name.isDirty && name.isEmpty,
      value: name.value,
      onChange: (e) => name.onChange(e),
      onBlur: (e) => name.onBlur(e),
      helperText: name.isDirty && name.isEmpty && name.error,
    },
    {
      label: "Отчество",
      error: secondName.isDirty && secondName.isEmpty,
      value: secondName.value,
      onChange: (e) => secondName.onChange(e),
      onBlur: (e) => secondName.onBlur(e),
      helperText: secondName.isDirty && secondName.isEmpty && secondName.error,
    },
    {
      label: "Номер рабочей группы",
      error: numberGroup.isDirty && numberGroup.isEmpty,
      value: numberGroup.value,
      onChange: (e) => numberGroup.onChange(e),
      onBlur: (e) => numberGroup.onBlur(e),
      helperText:
        numberGroup.isDirty && numberGroup.isEmpty && numberGroup.error,
    },
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
      error: testPassword(),
      value: password.value,
      type: "password",
      onChange: (e) => password.onChange(e),
      onBlur: (e) => password.onBlur(e),
      helperText: testPassword(),
    },
    {
      label: "Повторите пароль",
      error: testRepeatPassword(),
      value: repeatPassword.value,
      type: "password",
      onChange: (e) => repeatPassword.onChange(e),
      onBlur: (e) => repeatPassword.onBlur(e),
      helperText: testRepeatPassword(),
    },
  ];

  return (
    <div className={s.container}>
      {isLoading && <Loader />}
      <div className={s.wrap}>
        <form className={s.form} onSubmit={(e) => pushForm(e)}>
          <span className={s.loginText}>Регистрация</span>
          <InputList props={propsList} />
          <div className={s.containerButton}>
            <NavLink to="/login" style={{ textDecoration: "none" }}>
              <Button variant="text">Назад</Button>
            </NavLink>
            <Button type="submit" disabled={isValid()} variant="contained">
              Зарегистрироваться
            </Button>
          </div>
        </form>
      </div>
      {fetchError.test &&
        (fetchError.text == "Request failed with status code 400" ? (
          <Alert severity="error">"Почта уже существует"</Alert>
        ) : (
          <Alert severity="error">"Что-то пошло не так"</Alert>
        ))}
    </div>
  );
};

export default Register;
