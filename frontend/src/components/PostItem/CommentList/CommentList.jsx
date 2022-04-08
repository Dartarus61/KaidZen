import React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import { ListItemText } from "@mui/material";

const CommentList = () => {
  return (
    <List component="div" disablePadding>
      <ListItemText sx={{ pl: 4 }} primary="Комментарий 1" />
    </List>
  );
};

export default CommentList;
