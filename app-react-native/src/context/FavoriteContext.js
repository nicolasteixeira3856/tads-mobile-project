import React, { createContext, useReducer } from "react";
import api from "../api/api";

const FavoriteContext = createContext(null);

function favoriteReducer(state, action) {
  switch (action.type) {
    case "message":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return { ...state };
  }
}

const FavoriteProvider = ({children}) => {

  const [favoriteState, dispatch] = useReducer(favoriteReducer, {
    message: ""
  });

  const favorite = async({userId, estateId}) => {
    try {
      const response = await api.post('/favorites/addFavorite', {
        userId,
        estateId
      });
      dispatch({ type: "message", payload: response.data.msg });
    } catch (err) {
      dispatch({
        type: "message",
        payload: "Não foi possível favoritar o imóvel!",
      });
    }
  };

  const unfavorite = async({userId, estateId}) => {
    try {
      const response = await api.delete(`/favorites/deleteFavorite/${userId}/${estateId}`, {});
      dispatch({ type: "message", payload: response.data.msg });
    } catch (err) {
      dispatch({type: "message", payload: "Não foi possível favoritar o imóvel!",});
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteState,
        favorite,
        unfavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };