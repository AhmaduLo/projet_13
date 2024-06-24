import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userReducer";

// Crée un store Redux en utilisant Redux Toolkit
const store = configureStore({
  // Définissez les réducteurs (reducers) pour le store
  reducer: {
    // Le réducteur de l'utilisateur gère l'état lié à l'utilisateur
    user: userReducer,
  },
});

export default store;
