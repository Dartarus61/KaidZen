import React from "react";
import List from "@mui/material/List";
import { ListItemText } from "@mui/material";

const CommentList = ({ props }) => {
  return (
    <List sx={{ pl: 4 }} component="div" disablePadding>
      {!props.length
        ? "Комментариев нет"
        : props.map((el, index) => (
            <ListItemText
              sx={{ border: "1px solid black", borderRadius: "14px" }}
              primary={`Комментарий ${index + 1}`}
              secondary={el.description}
            />
          ))}
    </List>
  );
};

export default CommentList;
