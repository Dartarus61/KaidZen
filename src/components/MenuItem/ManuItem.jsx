import React from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const MenuItem = (props) => {
  return (
    <NavLink to={props.to} style={{ textDecoration: "none", color: "black" }}>
      <ListItem style={{ paddingRight: "0px" }} button>
        <ListItemText>{props.head}</ListItemText>
        <ListItemIcon>{props.icon}</ListItemIcon>
      </ListItem>
    </NavLink>
  );
};

export default MenuItem;
