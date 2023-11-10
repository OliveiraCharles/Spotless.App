// userSlice.ts

import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
	ThunkAction,
} from "@reduxjs/toolkit";
import { User, UserLogin } from "../Types";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { auth, db } from "../Config/firebaseConfig";
import {
	UserCredential,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { RootState } from ".";

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

// Função assíncrona para criar um usuário com autenticação por e-mail/senha
export const criarUsuarioAsync = createAsyncThunk(
	"user/criarUsuario",
	async (usuario: User, { rejectWithValue }) => {
		try {
			// Crie o usuário no Firestore
			const docRef = await addDoc(collection(db, "users"), usuario);

			// Crie o usuário na autenticação por e-mail/senha
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				usuario.email,
				usuario.password
			);

			// Extraia o novo usuário autenticado
			const novoUsuario = userCredential.user;

			// Atualize o usuário no Firestore com o ID autenticado
			// await docRef.set({ ...usuario, id: novoUsuario.uid });
			await setDoc(docRef, { ...usuario, id: novoUsuario.uid });

			// Retorne o novo usuário autenticado
			return {
				uid: novoUsuario.uid,
				email: novoUsuario.email,
				displayName: novoUsuario.displayName,
			};
		} catch (error) {
			console.error("Erro ao criar usuário:", error);
			return rejectWithValue(error.message);
		}
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
			action: PayloadAction<{
				uid: string;
				email: string;
				displayName: string;
			}>
		) => {
			state.loggedInUser = {
				uid: action.payload.uid,
				email: action.payload.email,
				displayName: action.payload.displayName,
			};
		},
	},
	extraReducers: (builder) => {
		// Reducer automático gerado por createAsyncThunk
		// builder.addCase(addUserAsync.fulfilled, (state, action) => {
		// 	state.users.push(action.payload);
		// });
		builder.addCase(addUserAsync.fulfilled, (state, action) => {
			state.users.push({
				uid: action.payload.uid,
				email: action.payload.email,
				displayName: action.payload.displayName,
			});
		});
	},
});

export const loginUserAsync =
	(credentials: UserLogin): ThunkAction<void, RootState, unknown, any> =>
	async (dispatch, getState) => {
		try {
			const auth = getAuth();
			const userCredential: UserCredential = await signInWithEmailAndPassword(
				auth,
				credentials.email,
				credentials.password
			);

			// O login foi bem-sucedido, você pode agora despachar a ação síncrona de login
			dispatch(login(userCredential.user));
		} catch (error) {
			console.error("Erro ao fazer login:", error);
			// Adicione um fluxo de feedback de erro aqui, se necessário
		}
	};

export const { addUser, login } = userSlice.actions;
export default userSlice.reducer;
