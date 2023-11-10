// userSlice.ts

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../Types";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../Config/firebaseConfig";

interface UserState {
  users: User[];
  loggedInUser: User | null;
}

const initialState: UserState = {
  users: [],
  loggedInUser: null,
};

// Definindo uma operação assíncrona para adicionar um usuário ao Firestore
export const addUserAsync = createAsyncThunk(
  "user/addUserAsync",
  async (user: User) => {
    const docRef = await addDoc(collection(db, "users"), user);
    return { ...user, id: docRef.id };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Reducer síncrono que é chamado quando addUserAsync é resolvido com sucesso
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    login: (
      state,
      action: PayloadAction<{ name: string; password: string }>
    ) => {
      const { name, password } = action.payload;
      const loggedInUser = state.users.find(
        (user) => user.name === name && user.password === password
      );
      state.loggedInUser = loggedInUser || null;
    },
  },
  extraReducers: (builder) => {
    // Reducer automático gerado por createAsyncThunk
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      state.users.push(action.payload);
    });
  },
});

export const { addUser, login } = userSlice.actions;
export default userSlice.reducer;
