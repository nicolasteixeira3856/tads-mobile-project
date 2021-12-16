import React, { createContext, useReducer } from "react";
import api from "../api/api";

const FavoriteContext = createContext(null);

function favoriteReducer(state, action) {
  switch (action.type) {
    case "listAllFavoritedEstatesByUserId":
      return {
        ...state,
        favoritedEstates: action.payload
      };
    case "removeEstateOnUnfavorite":
      return { ...state, favoritedEstates: state.favoritedEstates.filter(favoritedEstate => favoritedEstate.Estate.id !== action.payload)};
    case "message":
      return {
        ...state,
        message: action.payload,
      };
    case "messageFavoritesScreen":
      return {
        ...state,
        messageFavoritesScreen: action.payload,
      };
    default:
      return { ...state };
  }
}

const FavoriteProvider = ({children}) => {

  const [favoriteState, dispatch] = useReducer(favoriteReducer, {
    message: "",
    messageFavoritesScreen: "",
    favoritedEstates: []
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
      dispatch({type: "message", payload: "Não foi possível remover o imóvel dos favoritos!",});
    }
  };

  const removeEstateOnUnfavorite = async({estateId}) => {
    try {
      dispatch({ type: "removeEstateOnUnfavorite", payload: estateId });
    } catch (err) {
      dispatch({type: "messageFavoritesScreen", payload: "Não foi possível remover o imóvel dos favoritos!",});
    }
  };

  const listAllFavoritedEstatesByUserId = async({id}) => {
    try {
      const response = await api.post('/favorites/listAllFavoritedEstatesByUserId', {
        id,
      });
      dispatch({ type: "listAllFavoritedEstatesByUserId", payload: response.data.favorites });
      dispatch({type: "messageFavoritesScreen", payload: "",});
    } catch (err) {
      dispatch({
        type: "messageFavoritesScreen",
        payload: "Nenhum imóvel foi favoritado! ",
      });
      dispatch({ type: "listAllFavoritedEstatesByUserId", payload: [] })
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteState,
        favorite,
        unfavorite,
        listAllFavoritedEstatesByUserId,
        removeEstateOnUnfavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export { FavoriteContext, FavoriteProvider };