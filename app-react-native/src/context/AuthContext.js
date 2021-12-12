import React, { createContext, useReducer, useEffect } from "react";
import * as Navigator from '../core/navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../api/api";

const AuthContext = createContext(null);

function authReducer(state, action) {
  switch (action.type) {
    case "signIn":
      return {
        ...state,
        signedIn: true,
        x_access_token: action.payload.token,
        userId: action.payload.user.id
      };
    case "message":
      return {
        ...state,
        message: action.payload,
      };
    case "signOut":
      return {
        ...state,
        signedIn: false,
        x_access_token: null,
        userId: null,
      };
    default:
      return { ...state };
  }
}

const AuthProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    signedIn: false,
    x_access_token: null,
    userId: null,
    message: "",
  });

  const signOut = async () => {
    dispatch({type:'signOut'});
    Navigator.navigate('Login');
  }

  const signIn = async ({ email, password }) => {
    try {
      const response = await api.post('/users/authenticate', {
        email,
        password
      });
      await AsyncStorage.setItem('x_access_token', response.data.token);
      dispatch({ type: "signIn", payload: response.data });
      Navigator.navigate("HomeStack");
    } catch (err) {
      dispatch({
        type: "message",
        payload: "Não foi possível autenticar-se!",
      });
    }
  };

  const signUp = async ({ email, password }) => {
    try {
      await api.post('/users/createUser', {
        email,
        password
      });
      dispatch({
        type: "message",
        payload: "Cadastro realizado com sucesso, para efetuar o login clique novamente no switch.",
      });
    } catch (err) {
      dispatch({
        type: "message",
        payload: "Não foi possível realizar o cadastro!",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        signIn,
        signUp,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
