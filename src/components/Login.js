import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const Login = () => {
  // Déclaration des états pour l'email et le mot de passe
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch(); // Initialisation du dispatch pour utiliser les actions Redux
  const navigate = useNavigate(); // Initialisation de navigate pour rediriger l'utilisateur

  // Fonction de gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault(); // Empêche le comportement par défaut du formulaire

    try {
      // Réinitialise le message d'erreur à chaque soumission
      setError("");
      // Envoi de la requête de connexion au backend
      const response = await axios.post(
        "http://localhost:3001/api/v1/user/login",
        {
          email,
          password,
        }
      );
      // Récupération du token de la réponse
      const { token } = response.data.body;
      // Dispatch de l'action pour sauvegarder le token dans le store Redux
      dispatch(setToken(token));

      // Requête pour obtenir le profil de l'utilisateur avec le token
      const profileResponse = await axios.get(
        "http://localhost:3001/api/v1/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Dispatch de l'action pour sauvegarder les informations de l'utilisateur dans le store Redux
      dispatch(setUser(profileResponse.data.body));

      // Redirection vers la page de profil
      navigate("/profil");
    } catch (error) {
      // Gestion des erreurs

      if (error.response) {
        if (error.response.status === 400) {
          setError("Mot de passe ou email incorrect.");
        } else if (error.response.status === 401) {
          setError("Accès non autorisé. Veuillez vérifier vos identifiants.");
        } else {
          setError("Une erreur s'est produite. Veuillez réessayer.");
        }
      } else {
        setError("Une erreur s'est produite. Veuillez réessayer.");
      }
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
