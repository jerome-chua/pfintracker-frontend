import React, { useReducer } from 'react';
import axios from 'axios';
// axios.defaults.withCredentials = true;


// INTIAL STATE 
export const initialState = {
  transactions: [],
}


// ACTION TYPES
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
export function getTransactionsAction(transactions) {
  return {
    type: GET_TRANSACTIONS,
    payload: transactions,   
  }
}


// PROVIDER HOC
export const SavifyContext = React.createContext(null); 
const { Provider } = SavifyContext;

export function SavifyProvider({children}) {
  // Allows state to be updated via dispatch(action)
  const [store, dispatch] = useReducer(savifyReducer, initialState)

  return (
    <Provider value={{store, dispatch}}>
      {children}
    </Provider>
  )
}

// REQUESTS TO BACKEND
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:3004";

// TODO: Remove hardcoded userId 1.
export function getTransactions(dispatch, userId=1) {
  axios.get(`${REACT_APP_BACKEND_URL}/gettransactions/${userId}`)
    .then((res) => {
      dispatch(getTransactionsAction(res.data));
    });
}