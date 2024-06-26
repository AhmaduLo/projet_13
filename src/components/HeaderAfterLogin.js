import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "../reducers/userReducer";


const HeaderAfterLogin = () => {
  // Sélection de l'utilisateur et du token dans le store Redux
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate(); // Initialisation de navigate pour rediriger l'utilisateur
  const dispatch = useDispatch(); // Initialisation du dispatch pour utiliser les actions Redux

  // useEffect pour récupérer le profil de l'utilisateur si le token est présent
  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3001/api/v1/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // Met à jour l'utilisateur dans le store Redux
          dispatch(setUser(response.data.body));
        })
        .catch((error) => {
          // Gestion des erreurs et redirection vers la page d'accueil
          console.error("Error fetching user profile", error);
          dispatch(clearUser());
          navigate("/");
        });
    } else {
      navigate("/"); // Redirection vers la page d'accueil si le token est absent
    }
  }, [token, navigate, dispatch]);

  // Fonction de déconnexion
  const handleSignOut = () => {
    dispatch(clearUser()); // Efface l'utilisateur et le token dans le store Redux
    navigate("/"); // Redirection vers la page d'accueil
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/profil">
        <img
          className="main-nav-logo-image"
          src="./img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <>
          <Link className="main-nav-item" to="/profil">
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
