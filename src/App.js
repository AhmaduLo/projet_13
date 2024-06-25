import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import TransactionPage from "./pages/TransactionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profil" element={<ProfilePage/>} />
        <Route path="/transactions/:accountId" element={<TransactionPage/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
