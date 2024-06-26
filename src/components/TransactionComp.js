import React, { useState } from "react";
import { useParams } from "react-router-dom";


// Définition des transactions fictives pour chaque compte.
const transactions = {
  "8349": [
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$5.00",
      balance: "$2082.79",
      type: "Electronic",
      category: "Food",
      notes: "",
    },
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$10.00",
      balance: "$2087.79",
      type: "Electronic",
      category: "Food",
      notes: "",
    },
    // Ajoutez d'autres transactions ici
  ],
  "6712": [
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$10.00",
      balance: "$10928.42",
      type: "Electronic",
      category: "Food",
      notes: "",
    },
    // Ajoutez d'autres transactions ici
  ],
  "5201": [
    {
      date: "June 20th, 2020",
      description: "Golden Sun Bakery",
      amount: "$50.00",
      balance: "$184.30",
      type: "Electronic",
      category: "Food",
      notes: "",
    },
    // Ajoutez d'autres transactions ici
  ],
};
const TransactionComp = (props) => {
  const { accountId } = useParams(); // Obtient l'ID du compte à partir des paramètres de l'URL.
  const [editTransaction, setEditTransaction] = useState(null); // État pour la transaction en cours de modification.
  const [category, setCategory] = useState(""); // État pour la catégorie de la transaction en cours de modification.
  const [notes, setNotes] = useState(""); // État pour les notes de la transaction en cours de modification.
  const [openTransaction, setOpenTransaction] = useState(null); // État pour la transaction actuellement ouverte.

  // Fonction pour commencer la modification d'une transaction.
  const handleEdit = (transaction) => {
    setEditTransaction(transaction);
    setCategory(transaction.category);
    setNotes(transaction.notes);
  };

  // Fonction pour sauvegarder les modifications d'une transaction.
  const handleSave = (transaction) => {
    transaction.category = category;
    transaction.notes = notes;
    setEditTransaction(null);
  };

  // Fonction pour annuler la modification.
  const handleCancel = () => {
    setEditTransaction(null);
  };

  // Fonction pour ouvrir/fermer les détails d'une transaction.
  const toggleTransaction = (index) => {
    setOpenTransaction(openTransaction === index ? null : index);
  };

  return (
    <div className="transaction-list">
      <div className="account-balance">
        <h1>Argent Bank Account (x{accountId})</h1>
        {/* Affiche le solde disponible. */}
        <h2>{transactions[accountId][0].balance}</h2> 
        <p>Available Balance</p>
      </div>
      <div className="transaction-header">
        <span>DATE</span>
        <span>DESCRIPTION</span>
        <span>AMOUNT</span>
        <span>BALANCE</span>
      </div>
      {transactions[accountId].map((transaction, index) => (  // Boucle sur les transactions du compte.
        <div key={index} className="transaction">
          <div
            className="transaction-summary"
            onClick={() => toggleTransaction(index)}  // Gestion du clic pour ouvrir/fermer les détails.
          >
             {/* // Affiche un indicateur de l'état (ouvert/fermé). */}
            <span>
              <p> {openTransaction === index ? "▼" : "▲"}</p> 
              <p> {transaction.date}</p>
            </span>
            <span>{transaction.description}</span>
            <span>{transaction.amount}</span>
            <span>{transaction.balance}</span>
          </div>
          {openTransaction === index && (  // Affiche les détails de la transaction si elle est ouverte.
            <div className="transaction-details">
              {editTransaction === transaction ? (  // Si la transaction est en mode édition.
                <div className="transaction-edit">
                  <div>
                    <label>Category:</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="Food">Food</option>
                      <option value="Transport">Transport</option>
                      <option value="Shopping">Shopping</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label>Notes:</label>
                    <input
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <button onClick={() => handleSave(transaction)}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </div>
              ) : (  // Si la transaction n'est pas en mode édition.
                <div className="transaction-view">
                  <span>Category: {transaction.category}</span>
                  <span>Notes: {transaction.notes}</span>
                  <button onClick={() => handleEdit(transaction)}>
                    <i className="fa fa-pencil"></i>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TransactionComp;
