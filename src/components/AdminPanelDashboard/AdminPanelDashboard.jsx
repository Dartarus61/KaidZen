import { List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useFetching } from "../../items/hooks/useFetching";
import PostServis from "../../items/PostServis";
import Loader from "../../UI/Loader/Loader";
import UserItem from "../UserItem/UserItem";

const AdminPanelDashboard = () => {
  const [users, setUsers] = useState([]);
  const [fetchingUsers, isLoading, error] = useFetching(async () => {
    const users = await PostServis.getUsers();
    setUsers(users);
  });

  useEffect(() => {
    fetchingUsers();
  }, []);

  return (
    <List>
      {isLoading ? (
        <Loader />
      ) : !users.length ? (
        "Юзеров нет"
      ) : (
        users.map((el, index) => <UserItem props={el} index={index + 1} />)
      )}
    </List>
  );
};

export default AdminPanelDashboard;
