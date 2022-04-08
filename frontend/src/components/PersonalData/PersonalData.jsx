import { Button, Fab, TextField } from "@mui/material";
import React, { useState, useContext } from "react";
import s from "./PersonalData.module.css";
import { AuthContext } from "./../../items/context/context";

const PersonalData = () => {
  const { isAuth } = useContext(AuthContext);
  const [targetInput, setTargetInput] = useState({
    name: isAuth.data.name,
    surname: isAuth.data.surname,
    secondName: isAuth.data.secondName,
    namberGroup: isAuth.data.numberGroup,
  });

  const [canChange, setCanChange] = useState({
    name: true,
    surname: true,
    secondName: true,
    namberGroup: true,
  });

  const changeTarget = (e) => {
    console.log();
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

  const submit = {};

  return (
    <div className={s.container}>
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
          onClick={(e) => switchChange(e)}
        />
      </div>
      <Button
        disabled={
          canChange.name &&
          canChange.surname &&
          canChange.secondName &&
          canChange.namberGroup
        }
        className={s.input}
        style={{ marginTop: "35px" }}
        variant="contained"
        onClick={submit}
      >
        Сохранить
      </Button>
    </div>
  );
};

export default PersonalData;
