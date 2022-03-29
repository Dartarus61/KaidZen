import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom';
import { publicRoutes } from './../routing/router';
import { AuthContext } from './../context/context';

const AppRouter = () => {
    const {isAuth} = useContext(AuthContext)
    if (!isAuth.auth) {
        return (
            <Routes>
                {publicRoutes.map((route, index) =>
                    <Route path={route.path} element={route.element} key={index} />)}

            </Routes>
        )
    }
    else{
        switch (isAuth.role){
            case "user":
                break;
            case "glava":
                break;
            case "admin":
                break;        
        }
    }
}

export default AppRouter;