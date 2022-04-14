import React, { useEffect, useState } from 'react';
import { AuthContext } from "./items/context/context"
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from './router/AppRouter/AppRouter';

function App() {
  const [isAuth, setIsAuth] = useState({
    auth: false,
    role: "",
    data: {
      id:"",
      name: "",
      surname: "",
      secondName: "",
      numberGroup:"",
      login:"",
      token: "",
      area: "",
    }
  })

  useEffect(() =>{
    if(localStorage.getItem('auth')){
      setIsAuth(JSON.parse(localStorage.getItem('auth')))
    }
    else{
      setIsAuth({
        auth: false,
        role: "",
        data: {
          name: "",
          surname: "",
          secondName: "",
          numberGroup:"",
          token: ""
        }
      })
    }
  }, [])



  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
