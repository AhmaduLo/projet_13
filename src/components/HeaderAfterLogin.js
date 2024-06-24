import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const HeaderAfterLogin = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  //--------afficher le nom---------
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.body);
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
          localStorage.removeItem("token");
          navigate("/");
        });
    } else {
      navigate("/");
    }
  }, [navigate]);
  //-----deconnection------
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <>
          <Link className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            {user ? `${user.firstName}` : "User"}!
          </Link>
          <button className="main-nav-item" onClick={handleSignOut}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </button>
        </>
      </div>
    </nav>
  );
};

export default HeaderAfterLogin;
