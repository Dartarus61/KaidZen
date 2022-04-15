import { Button, Fab, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import s from "./PersonalData.module.css";
import { AuthContext } from "./../../items/context/context";
import axios from "../../http";
import { useFetching } from "../../items/hooks/useFetching";
import PostServis from "../../items/PostServis";
import Loader from "../../UI/Loader/Loader";

const PersonalData = () => {
  const { isAuth } = useContext(AuthContext);

  const [fetchingData, isLoading, error] = useFetching(async () => {
    await PostServis.switchData(
      targetInput.name,
      targetInput.surname,
      targetInput.secondName,
      targetInput.namberGroup,
      targetInput.login,
      isAuth.data.id
    );
    localStorage.setItem(
      "auth",
      JSON.stringify({
        auth: true,
        role: isAuth.role,
        data: {
          id: isAuth.data.id,
          area: isAuth.data.area,
          name: targetInput.name,
          surname: targetInput.surname,
          secondName: targetInput.secondName,
          login: targetInput.login,
          numberGroup: targetInput.namberGroup,
          token: isAuth.data.token,
        },
      })
    );
    setCanChange({
      name: true,
      surname: true,
      secondName: true,
      namberGroup: true,
      login: true,
    });
  });

  const [fetchingPassword, isLoadingPassword, errorPassword] = useFetching(
    async () => {
      await PostServis.switchPassword(
        targetInput.name,
        targetInput.surname,
        targetInput.secondName,
        targetInput.namberGroup,
        targetInput.login
      );
    }
  );

  const [targetInput, setTargetInput] = useState({
    name: isAuth.data.name,
    surname: isAuth.data.surname,
    secondName: isAuth.data.secondName,
    namberGroup: isAuth.data.numberGroup,
    login: isAuth.data.login,
  });

  const [canChange, setCanChange] = useState({
    name: true,
    surname: true,
    secondName: true,
    namberGroup: true,
    login: true,
  });

  const changeTarget = (e) => {
    setTargetInput({
      ...targetInput,
      [e.target.id]: e.target.value,
    });
  };

  const switchChange = (e) => {
    setCanChange({
      ...canChange,
      [e.target.id]: false,
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    fetchingData();
  };

  return (
    <div className={s.container}>
      {(isLoading || isLoadingPassword) && <Loader />}
      <div className={s.input}>
        <TextField
          disabled={canChange.name}
          id="name"
          label="Имя"
          variant="standard"
          style={{ width: "100%" }}
          value={targetInput.name}
          onChange={(e) => changeTarget(e)}
          onClick={(e) => switchChange(e)}
        />
      </div>
      <div className={s.input}>
        <TextField
          disabled={canChange.surname}
          className={s.input}
          id="surname"
          label="Фамилия"
          variant="standard"
          style={{ width: "100%" }}
          value={targetInput.surname}
          onChange={(e) => changeTarget(e)}
          onClick={(e) => switchChange(e)}
        />
      </div>
      <div className={s.input}>
        <TextField
          disabled={canChange.secondName}
          className={s.input}
          id="secondName"
          label="Отчество"
          variant="standard"
          style={{ width: "100%" }}
          value={targetInput.secondName}
          onChange={(e) => changeTarget(e)}
          onClick={(e) => switchChange(e)}
        />
      </div>
      <div className={s.input}>
        <TextField
          disabled={canChange.namberGroup}
          className={s.input}
          id="namberGroup"
          label="Номер группы"
          variant="standard"
          style={{ width: "100%" }}
          value={targetInput.namberGroup}
          onChange={(e) => changeTarget(e)}
          onClick={(e) => switchChange(e)}
        />
      </div>
      <div className={s.input}>
        <TextField
          disabled={canChange.login}
          className={s.input}
          id="login"
          label="Почта"
          variant="standard"
          style={{ width: "100%" }}
          value={targetInput.login}
          onChange={(e) => changeTarget(e)}
          onClick={(e) => switchChange(e)}
        />
      </div>
      <Button
        disabled={
          canChange.name &&
          canChange.surname &&
          canChange.secondName &&
          canChange.namberGroup &&
          canChange.login
        }
        className={s.input}
        style={{ marginTop: "35px" }}
        variant="contained"
        onClick={(e) => submit(e)}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default PersonalData;
