import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import {
  publicRoutes,
  userRoutes,
  adminRoutes,
  glavaRoutes,
} from "../routing/routing";
import { AuthContext } from "./../../items/context/context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  if (!isAuth.auth) {
    return (
      <Routes>
        {publicRoutes.map((route, index) => (
          <Route path={route.path} element={route.element} key={index} />
        ))}
      </Routes>
    );
  } else {
    switch (isAuth.role) {
      case "user":
        return (
          <Routes>
            {userRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        );
      case "admin":
        return (
          <Routes>
            {adminRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        );
      case "glava":
        return (
          <Routes>
            {glavaRoutes.map((route, index) => (
              <Route path={route.path} element={route.element} key={index} />
            ))}
          </Routes>
        );
    }
  }
};

export default AppRouter;
