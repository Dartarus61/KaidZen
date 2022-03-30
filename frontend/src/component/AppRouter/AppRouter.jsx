import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "./../routing/router";
import { AuthContext } from "./../context/context";

const AppRouter = () => {
  const { isAuth } = useContext(AuthContext);
  return (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route path={route.path} element={route.element} key={index} />
      ))}
    </Routes>
  );
};

export default AppRouter;
