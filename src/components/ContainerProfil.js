import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";

const Container_profil = () => {
  // Sélection de l'utilisateur et du token dans le store Redux
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch(); // Initialisation du dispatch pour utiliser les actions Redux
  const navigate = useNavigate();

  // États locaux pour gérer l'édition du profil
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(user ? user.firstName : "");
  const [lastName, setLastName] = useState(user ? user.lastName : "");

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
          // Met à jour l'utilisateur dans le store Redux et les états locaux
          dispatch(setUser(response.data.body));
          setFirstName(response.data.body.firstName);
          setLastName(response.data.body.lastName);
        })
        .catch((error) => {
          // Gestion des erreurs
          console.error("Error fetching user profile", error);
        });
    }
  }, [token, dispatch]);

  // Fonction pour sauvegarder les modifications du profil
  const handleSave = () => {
    axios
      .put(
        "http://localhost:3001/api/v1/user/profile",
        { firstName, lastName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // Met à jour l'utilisateur dans le store Redux et désactive le mode édition
        dispatch(setUser(response.data.body));
        setIsEditing(false);
      })
      .catch((error) => {
        // Gestion des erreurs
        console.error("Error updating user profile", error);
      });
  };

  // Fonction pour annuler les modifications du profil
  const handleCancel = () => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setIsEditing(false);
  };

  // Fonction pour crypter l'ID de transaction
  const encryptTransactionId = (transactionId) => {
    const secretKey = "your-secret-key"; // Remplacez par votre clé secrète
    const encryptedId = CryptoJS.AES.encrypt(transactionId, secretKey).toString();
    return encodeURIComponent(encryptedId); // Encodage de l'ID chiffré
  };
 
  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isEditing ? (
            <>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </>
          ) : (
            `${user ? `${user.firstName} ${user.lastName}` : "User"}!`
          )}
        </h1>
        {isEditing ? (
          <>
            <button className="edit-button" onClick={handleSave}>
              Save
            </button>
            <button className="edit-button" onClick={handleCancel}>
              Cancel
            </button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() =>
              navigate(`/transactions/${encryptTransactionId("8349")}`)
            }
          >
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() =>
              navigate(`/transactions/${encryptTransactionId("6712")}`)
            }
          >
            View transactions
          </button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x5201)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button
            className="transaction-button"
            onClick={() =>
              navigate(`/transactions/${encryptTransactionId("5201")}`)
            }
          >
            View transactions
          </button>
        </div>
      </section>
    </main>
  );
};

export default Container_profil;
