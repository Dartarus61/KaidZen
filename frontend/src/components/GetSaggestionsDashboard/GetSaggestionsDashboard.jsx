import { List } from "@mui/material";
import React, { useState, useContext, useEffect } from "react";
import { useFetching } from "../../items/hooks/useFetching";
import PostServis from "../../items/PostServis";
import { AuthContext } from "../../items/context/context";
import SuggestionsItem from "../SuggestionsItem/SuggestionsItem";
import Loader from "../../UI/Loader/Loader";

const GetSaggestionsDashboard = () => {
  const { isAuth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);

  const [fetchingPosts, isLoading, error] = useFetching(async () => {
    const posts = await PostServis.getPostFromArea(isAuth.data.area);
    setPosts(posts);
  });

  useEffect(() => {
    fetchingPosts();
  }, []);

  console.log(posts);
  return (
    <List>
      {isLoading ? (
        <Loader />
      ) : posts.length ? (
        posts.map((el) => <SuggestionsItem props={el} />)
      ) : (
        <p>Предложений нет</p>
      )}
    </List>
  );
};

export default GetSaggestionsDashboard;
