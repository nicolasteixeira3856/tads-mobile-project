import React, { createContext, useReducer, useContext } from "react";
import * as Navigator from '../core/navigator';
import api from "../api/api";

const EstateContext = createContext(null);

function estateReducer(state, action) {
  switch (action.type) {
    case "listAllEstates":
      return {
        ...state,
        estates: action.payload
      };
    case "message":
      return {
        ...state,
        message: action.payload,
      };
    default:
      return { ...state };
  }
}

const EstateProvider = ({children}) => {

  const [estateState, dispatch] = useReducer(estateReducer, {
    estates: [],
    message: ""
  });

  const listAllEstates = async({id}) => {
    try {
      const response = await api.post('/estates/listAllEstates', {
        id,
      });
      dispatch({ type: "listAllEstates", payload: response.data.estate });
    } catch (err) {
      dispatch({
        type: "message",
        payload: "Não foi possível recuperar os imóveis!",
      });
    }
  };

  return (
    <EstateContext.Provider
      value={{
        estateState,
        listAllEstates
      }}
    >
      {children}
    </EstateContext.Provider>
  );
};

export { EstateContext, EstateProvider };