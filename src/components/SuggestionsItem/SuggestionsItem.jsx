import { ListItem, ListItemText } from "@mui/material";
import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { useFetching } from "../../items/hooks/useFetching";
import PostServis from "../../items/PostServis";
import { AuthContext } from "../../items/context/context";
import Loader from "../../UI/Loader/Loader";
import axios from "../../http";

const SuggestionsItem = ({ props }) => {
  const { isAuth } = useContext(AuthContext);
  const [postState, setPostState] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [visibleSuggestion, setVisibleSuggestion] = useState(true);

  const [fetchingPosts, isLoading, error] = useFetching(async () => {
    if (postState) {
      const posts = await PostServis.getCommentTrue(
        props.id,
        commentText,
        isAuth.data.id
      );
      setVisibleSuggestion(false);
    } else {
      const posts = await PostServis.getCommentFalse(
        props.id,
        commentText,
        isAuth.data.id
      );
      setVisibleSuggestion(false);
    }
  });

  const pushComment = () => {
    fetchingPosts();
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
    <ListItem
      sx={{
        border: "1px solid black",
        borderRadius: "14px",
        display: visibleSuggestion ? "" : "none",
      }}
    >
      {isLoading && <Loader />}
      <ListItemText
        primary={`Предложение: `}
        secondary={
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>{`Сотрудник: ${props.Author}`}</p>
            <p>{`Группа: ${props.Group}`}</p>
            <p>{`Подано: ${props.createdAt
              .slice(0, 19)
              .split("T")
              .reverse()
              .join(" ")}`}</p>
            <p>{`Предложение: ${props.description}`}</p>
            <p>{`Ожидаемый экономический эффект: ${props.economic}`}</p>
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
            <div
              style={
                postState || postState === null
                  ? { display: "none", minWidth: "100px", minHeight: "100px" }
                  : {}
              }
            >
              <p>Коментарий:</p>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              ></textarea>
            </div>
          </div>
        }
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "5px" }}>
          <Button
            onClick={(e) => setPostState(true)}
            variant="contained"
            color="success"
          >
            Подтвердить
          </Button>
          <Button
            onClick={(e) => setPostState(false)}
            variant="contained"
            color="error"
          >
            Отклонить
          </Button>
        </div>
        <Button
          disabled={postState === null}
          onClick={(e) => {
            pushComment();
          }}
          variant="contained"
        >
          Сохранить
        </Button>
      </div>
    </ListItem>
  );
};

export default SuggestionsItem;
