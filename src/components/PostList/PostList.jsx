import List from "@mui/material/List";
import PostItem from "../PostItem/PostItem";

export default function PostList({ posts }) {
  posts.sort(function (a, b) {
    return b.id - a.id;
  });
  return (
    <List
      sx={{
        width: "100%",
        height: "100%",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {!posts.length
        ? "Предложений нет"
        : posts.map((el, index) => <PostItem props={el} index={index + 1} />)}
    </List>
  );
}
