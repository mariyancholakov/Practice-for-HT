import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreatePostPage from "./pages/CreatePostPage";
import MainPage from "./pages/MainPage";
import NavBar from "./pages/NavBar";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<MainPage />}></Route>
        <Route path="/api/auth/login" element={<LoginPage />} />
        <Route path="/api/auth/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/posts/create" element={<CreatePostPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
