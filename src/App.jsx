import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchDetailUser } from "./store/authSlice";
import SettingProfilePage from "./pages/SettingProfilePage";
import CreateThreadPage from "./pages/CreateThreadPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetailUser());
    console.log("fetch di APP");
  }, []);

  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        <Route path="/settings" element={<SettingProfilePage />} />
        <Route path="/create/thread" element={<CreateThreadPage />} />
      </Routes>
    </>
  );
}

export default App;
