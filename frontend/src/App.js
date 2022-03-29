import React, { useState } from 'react';
import { AuthContext } from "./component/context/context.js"
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import AppRouter from './component/AppRouter/AppRouter.jsx';

function App() {
  const [isAuth, setIsAuth] = useState(false)

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
