import React, { useContext, useEffect, useState } from "react";
import s from "./Register.module.css";
import Button from "@mui/material/Button";
import { Navigate, NavLink } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { AuthContext } from "../context/context";
import InputList from "../InputList/InputList";

const Register = () => {
  const { setIsAuth } = useContext(AuthContext);
  const surname = useInput("", { isEmpty: true });
  const name = useInput("", { isEmpty: true });
  const secondName = useInput("", { isEmpty: true });
  const numberGroup = useInput("", { isEmpty: true });
  const login = useInput("", { isEmpty: true });
  const password = useInput("", { isEmpty: true, minLength: 8 });
  const repeatPassword = useInput("", { isEmpty: true, minLength: 8 });
  const [passwordError, setPasswordError] = useState(false);

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
  const pushForm = (e) => {
    e.preventDefault();
    setIsAuth({
      auth: true,
      role: "user",
      data: {
        name: name.value,
        surname: surname.value,
        secondName: secondName.value,
        numberGroup: numberGroup.value,
      },
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
      label: "Логин",
      error: login.isDirty && login.isEmpty,
      value: login.value,
      onChange: (e) => login.onChange(e),
      onBlur: (e) => login.onBlur(e),
      helperText: login.isDirty && login.isEmpty && login.error,
    },
    {
      label: "Пароль",
      error: testPassword(),
      value: password.value,
      onChange: (e) => password.onChange(e),
      onBlur: (e) => password.onBlur(e),
      helperText: testPassword(),
    },
    {
      label: "Повторите пароль",
      error: testRepeatPassword(),
      value: repeatPassword.value,
      onChange: (e) => repeatPassword.onChange(e),
      onBlur: (e) => repeatPassword.onBlur(e),
      helperText: testRepeatPassword(),
    },
  ];

  return (
    <div className={s.container}>
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
    </div>
  );
};

export default Register;
