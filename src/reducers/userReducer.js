import { createSlice } from '@reduxjs/toolkit';

// Crée une tranche (slice) Redux pour l'utilisateur
const userSlice = createSlice({
  name: 'user', // Nom de la tranche
  initialState: {
    user: null, // État initial de l'utilisateur
    token: localStorage.getItem('token') || null, // Récupère le token du localStorage, si disponible
  },
  reducers: {
    // Définit un réducteur pour mettre à jour l'utilisateur dans l'état
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // Définit un réducteur pour effacer l'utilisateur et le token de l'état
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Supprime le token du localStorage
    },
    // Définit un réducteur pour mettre à jour le token dans l'état et le localStorage
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Stocke le token dans le localStorage
    },
  },
});

// Exporte les actions générées par createSlice
export const { setUser, clearUser, setToken } = userSlice.actions;
// Exporte le réducteur de la tranche pour être utilisé dans le store
export default userSlice.reducer;