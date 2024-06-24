import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Login from "../components/Login";

const LoginPage = (props) => {
  return (
    <div className="logins">
      <Header />
      <Login/>
      <Footer />
    </div>
  );
};

export default LoginPage;
