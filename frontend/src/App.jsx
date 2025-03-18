import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import MainPage from "./pages/MainPage";
import NavBar from "./pages/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/api/auth/login" element={<LoginPage />} />
        <Route path="/api/auth/register" element={<RegisterPage />} />
        <Route path="/posts/create" element={<CreatePostPage />} />
      </Routes>
    </>
  );
}

export default App;
