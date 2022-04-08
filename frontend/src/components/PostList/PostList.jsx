import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import PostItem from "../PostItem/PostItem";
import axios from "axios";

export default function PostList() {
  const [isLoading, setIsLoading] = useState(false);
  const posts = [];
  useEffect(async () => {
    setIsLoading(true);
    await axios
      .get("/user?ID=12345")
      .then(function (response) {
        posts = response.data;
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function (error) {
        setIsLoading(false);
      });
  }, []);

  return (
    <List
      sx={{ width: "100%", bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {posts.map((el) => (
        <PostItem props={el} />
      ))}
    </List>
  );
}
