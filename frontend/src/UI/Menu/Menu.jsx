import * as React from "react";
import { AuthContext } from "../../items/context/context";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SendIcon from "@mui/icons-material/Send";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuItem from "../../components/MenuItem/ManuItem";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import AssignmentIcon from "@mui/icons-material/Assignment";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Menu({ children, head }) {
  const { isAuth, setIsAuth } = React.useContext(AuthContext);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let menuList = [];

  if (isAuth.role === "admin") {
    menuList = [
      <MenuItem
        to="/admin"
        head="Админ панель"
        icon={<AdminPanelSettingsIcon />}
      />,
      <MenuItem
        to="/allSuggestions"
        head="Все предложения"
        icon={<AssignmentIcon />}
      />,
    ];
  } else if (isAuth.role === "glava") {
    menuList = [
      <MenuItem to="/profile" head="Профиль" icon={<AccountCircleIcon />} />,
      <MenuItem
        to="/saggestions"
        head="Новые предложения"
        icon={<AssignmentIcon />}
      />,
    ];
  } else {
    menuList = [
      <MenuItem to="/profile" head="Профиль" icon={<AccountCircleIcon />} />,
      <MenuItem to="/send" head="Отправить предложение" icon={<SendIcon />} />,
    ];
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {head}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <List>{menuList}</List>
          <List>
            <ListItem
              style={{ paddingRight: "0px" }}
              button
              onClick={(e) => {
                localStorage.removeItem("auth");
                setIsAuth({});
              }}
            >
              <ListItemText>Выход</ListItemText>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
            </ListItem>
          </List>
        </div>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
