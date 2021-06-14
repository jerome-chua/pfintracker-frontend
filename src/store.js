import React, { useReducer } from 'react';
import axios from 'axios';
// axios.defaults.withCredentials = true;

// INTIAL STATE
const initialState = {
  transactions: [],
}

// TYPE CONSTANTS
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

// REDUCER FUNCTION
export function savifyReducer(state, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    default:
      return state
  }
}

// ACTION CREATORS
export function getTransactionsAction()


// PROVIDER HOC
export const savifyContext = React.createContext(null); 
const { Provider } = savifyContext;

export function savifyProvider({children}) {
  const [store, dispatch] = useReducer(savifyReducer, initialState)

  return (
    <Provider value={{store, dispatch}}>
      {children}
    </Provider>
  )
}

// REQUESTS TO BACKEND
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

