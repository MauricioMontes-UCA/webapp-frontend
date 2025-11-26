import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Homepage from "../pages/Home/Homepage.jsx";
import Login from "../pages/Login/Login.jsx";
import MainPage from "../pages/MainPage/MainPage.jsx";
import Signup from "../pages/Signup/Signup.jsx";
import UserProfile from "../pages/UserProfile/UserProfile.jsx";
import Settings from "../pages/Settings/Settings.jsx";
import MyLibrary from "../pages/MyLibrary/MyLibrary.jsx";
import BooksPage from "../pages/BooksPage/Description.jsx";
import Header from "../components/Header/Header.jsx";
import SearchBar from "../components/SearchBar/SearchBar.jsx";

import PrivateRoute from "./PrivateRoute.jsx";
import PageResults from "../pages/SearchPage/PageResults.jsx";
import NotFoundPage from "../pages/NotFound/NotFound.jsx";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/search" element={<PageResults />} />
        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<MainPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/description" element={<BooksPage />}/>
          <Route path="/my-library" element={<MyLibrary />} />
        </Route>
        <Route path="*" element={<NotFoundPage />}/>
      </Routes>
    </Router>
  );
};

export default AppRouter;
