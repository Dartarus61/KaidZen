import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import React, { useContext } from "react";
import s from "./Menu.module.css";
import { AuthContext } from "../context/context";
const Menu = () => {
  const { setIsAuth } = useContext(AuthContext);

  return (
    <div className={s.container}>
      <List>
        <ListItem button>
          <ListItemText primary="Профиль" />
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Отправить предложения" />
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
        </ListItem>
      </List>
      <List>
        <ListItem button>
          <ListItemText primary="Выход" />
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
        </ListItem>
      </List>
    </div>
  );
};

export default Menu;
