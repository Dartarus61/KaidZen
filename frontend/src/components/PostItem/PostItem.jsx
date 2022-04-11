import { ListItemText, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import CommentList from "./CommentList/CommentList";

const PostItem = ({ props, index }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  const cheakStatus = () => {
    switch (props.accepted) {
      case null:
        return "В обработке";
      case true:
        return "Принято";
      case null:
        return "Отклонено";
    }
  };

  console.log(props);

  return (
    <div>
      <ListItemButton
        sx={{ border: "1px solid black", borderRadius: "14px" }}
        onClick={handleClick}
      >
        <ListItem>
          <ListItemText
            primary={`Предложение ${index}`}
            secondary={
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>Предложение: {props.description}</p>
                <p>Предполагаемый экономический эффект: {props.economic}</p>
              </div>
            }
          />
        </ListItem>
        {open ? (
          <div style={{ display: "flex" }}>
            {cheakStatus()}
            <ExpandLess />
          </div>
        ) : (
          <div style={{ display: "flex" }}>
            {cheakStatus()}
            <ExpandMore />
          </div>
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <CommentList props={props.Comments} />
      </Collapse>
    </div>
  );
};

export default PostItem;
