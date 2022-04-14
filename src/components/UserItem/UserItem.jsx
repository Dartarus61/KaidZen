import { useState } from "react";
import { ListItemText, ListItem } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import { useFetching } from "../../items/hooks/useFetching";
import Button from "@mui/material/Button";
import s from "./UserItem.module.css";
import PostServis from "../../items/PostServis";
import Loader from "../../UI/Loader/Loader";

const UserItem = ({ props, index }) => {
  const [userData, setUserData] = useState({
    name: props.name,
    surname: props.surname,
    secondname: props.secondname,
    group: props.group,
    role: props.role,
    naprav: props.area_of_improvement,
  });

  const [fetching, isLoading, error] = useFetching(async (id, role, area) => {
    await PostServis.setChange(id, role, area);
    props.role = role;
    props.area_of_improvement = area;
  });

  const switchRole = (e) => {
    setUserData({ ...userData, role: e.target.value });
  };

  const switchNaprav = (e) => {
    setUserData({ ...userData, naprav: e.target.value });
  };

  const refactorRole = (role) => {
    if (role === "admin") {
      return "Админ";
    } else if (role === "user") {
      return "Юзер";
    } else {
      return "Глава направления";
    }
  };

  const refactorNaprav = (naprav) => {
    if (userData.role === "glava") {
      switch (naprav) {
        case "transport":
          return "Транспортное";
        case "details":
          return "Детали";
        case "methods":
          return " Методы производства";
        default:
          return "";
      }
    } else {
      return "";
    }
  };
  return (
    <ListItem sx={{ border: "1px solid black", borderRadius: "14px" }}>
      {isLoading && <Loader />}
      <ListItemText
        primary={`Пользователь ${index}`}
        secondary={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{`Имя: ${userData.name}`}</p>
            <p>{`Фамилия: ${userData.surname}`}</p>
            <p>{`Отчество: ${userData.secondname}`}</p>
            <p>{`Номер группы: ${userData.group}`}</p>
            <p>{`Роль: ${refactorRole(userData.role)}`}</p>
            <p>
              {userData.role === "glava"
                ? `Направление: ${refactorNaprav(userData.naprav)}`
                : ""}
            </p>
          </div>
        }
      />
      <div className={s.buttonContainer}>
        <ButtonGroup
          style={{ margin: "auto" }}
          disableElevation
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button value="user" onClick={(e) => switchRole(e)}>
            Пользователь
          </Button>
          <Button value="glava" onClick={(e) => switchRole(e)}>
            Глава направления
          </Button>
        </ButtonGroup>
        <ButtonGroup
          style={{ marginTop: "5px" }}
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button value="transport" onClick={(e) => switchNaprav(e)}>
            Транспортировка
          </Button>
          <Button value="details" onClick={(e) => switchNaprav(e)}>
            Детали
          </Button>
          <Button value="methods" onClick={(e) => switchNaprav(e)}>
            Методы производства
          </Button>
        </ButtonGroup>
        <Button
          onClick={(e) => {
            fetching([props.id, userData.role, userData.naprav]);
          }}
          disabled={
            !(userData.role === "user" && props.role === "glava") &&
            !(
              props.role === "user" &&
              userData.role === "glava" &&
              userData.naprav !== null
            ) &&
            !(
              userData.role === "glava" &&
              userData.naprav !== props.area_of_improvement
            )
          }
          style={{ marginTop: "5px" }}
          variant="contained"
        >
          Сохранить
        </Button>
      </div>
    </ListItem>
  );
};

export default UserItem;
