import { ListItemText, ListItem } from "@mui/material";
import ListItemButton from "@mui/material/ListItemButton";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import React, { useState } from "react";
import { Button } from "@mui/material";
import CommentList from "./CommentList/CommentList";
import { Link } from "react-router-dom";
import axios from "../../http";

const PostItem = ({ props, index }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const cheakStatus = () => {
    switch (props.accepted) {
      case "true":
        return <p style={{ color: "green" }}>Принято</p>;
      case "false":
        return <p style={{ color: "red" }}>Отклонено</p>;
      case "На рассмотрении":
        return <p>В обработке</p>;
    }
  };

  const download = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:3001/api/download?id=${props.id}`)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${props.fileName}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

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
                {props.filePath ? (
                  <div>
                    <p>Файл:</p>
                    <Button
                      onClick={(e) => {
                        download(e);
                      }}
                    >
                      Скачать Файл
                    </Button>
                  </div>
                ) : (
                  ""
                )}
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
