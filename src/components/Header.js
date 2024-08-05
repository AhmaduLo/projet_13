import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser, clearUser } from "../reducers/userReducer";

const Header = () => {
  // Sélectionne l'utilisateur et le token depuis le store Redux
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const navigate = useNavigate(); // Hook pour naviguer entre les pages
  const dispatch = useDispatch(); // Hook pour dispatcher les actions Redux

  // Effet pour récupérer le profil de l'utilisateur si le token est présent
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
          // En cas d'erreur, efface les données utilisateur et redirige vers la page d'accueil
          console.error("Erreur lors de la récupération du profil utilisateur", error);
          dispatch(clearUser());
          navigate("/");
        });
    }
  }, [token, navigate, dispatch]);

  // Fonction de déconnexion
  const handleSignOut = () => {
    dispatch(clearUser()); // Efface l'utilisateur et le token dans le store Redux
    navigate("/"); // Redirection vers la page d'accueil
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
        {user ? (
          <>
            <Link className="main-nav-item" to="/profil">
              <i className="fa fa-user-circle"></i>
              {user.firstName}
            </Link>
            <button className="main-nav-item" onClick={handleSignOut}>
              <i className="fa fa-sign-out"></i>
              Déconnexion
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Connexion
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Header;