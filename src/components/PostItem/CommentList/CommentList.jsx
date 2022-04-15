import React from "react";
import List from "@mui/material/List";
import { ListItemText } from "@mui/material";

const CommentList = ({ props }) => {
  console.log(props);
  props = props.filter((el) => (el.description === "" ? 0 : 1));
  return (
    <List sx={{ pl: 4 }} component="div" disablePadding>
      {!props.length
        ? "Комментариев нет"
        : props.map((el) => (
            <ListItemText
              sx={{
                border: "1px solid black",
                borderRadius: "8px",
                padding: "10px",
              }}
              primary={`Комментарий`}
              secondary={el.description}
            />
          ))}
    </List>
  );
};

export default CommentList;
