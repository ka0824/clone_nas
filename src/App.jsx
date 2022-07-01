import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login></Login>}></Route>
        <Route path="/main" element={<Main></Main>}></Route>
      </Routes>
    </div>
  );
}

export default App;
