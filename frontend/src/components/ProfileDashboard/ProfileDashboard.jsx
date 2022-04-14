import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonalData from "./../PersonalData/PersonalData";
import PostList from "./../PostList/PostList";
import Loader from "../../UI/Loader/Loader";
import PostServis from "../../items/PostServis";
import { AuthContext } from "../../items/context/context";
import { useFetching } from "../../items/hooks/useFetching";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}

export default function ProfileDashboard() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const { isAuth } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [fetchingPosts, isLoading, error] = useFetching(async () => {
    if (isAuth.role === "user") {
      const posts = await PostServis.getMyPost(isAuth.data.id);
      setPosts(posts);
    } else {
      const posts = await PostServis.getPostFromAreaFalse(isAuth.data.area);
      setPosts(posts);
    }
  });

  useEffect(() => {
    fetchingPosts();
  }, []);

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        width: "100%",
        position: "relative",
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Личные данные" {...a11yProps(0)} />
          <Tab
            label={
              isAuth.role === "user"
                ? "Отправленые предложения"
                : "Все предложения"
            }
            {...a11yProps(1)}
          />
        </Tabs>
      </AppBar>
      {isLoading ? (
        <Loader />
      ) : (
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <PersonalData />
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <PostList posts={posts} />
          </TabPanel>
        </SwipeableViews>
      )}
    </Box>
  );
}
