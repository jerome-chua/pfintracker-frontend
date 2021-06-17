import React, { useReducer } from 'react';
import axios from 'axios';
// axios.defaults.withCredentials = true;


// INITIAL STATE 
export const initialState = {
  transactions: [],
  categories: [],
  hashtags: [],
  periodChoice: "",
  dateRange: {},
  loading: false,
}


// ACTION TYPES
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';
const ADD_TRANSACTION = 'ADD_TRANSACTION';
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_HASHTAGS = 'GET_HASHTAGS';
const RUN_LOADER = 'RUN_LOADER';
const HIDE_LOADER = 'HIDE_LOADER';
const SET_PERIOD = 'SET_PERIOD';
const SET_DATES = 'SET_DATES';

// REDUCER FUNCTION
export function savifyReducer(state, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return { ...state, transactions: action.payload };
    case ADD_TRANSACTION:
      return { ...state, transactions: [...state.transactions, action.payload] };
    case GET_CATEGORIES:
      return { ...state, categories: action.payload };
    case GET_HASHTAGS:
      return { ...state, hashtags: action.payload };
    case RUN_LOADER:
      return { ...state, loading: action.payload };
    case HIDE_LOADER:
      return { ...state, loading: action.payload };
    case SET_PERIOD:
      return { ...state, periodChoice: action.payload };
    case SET_DATES:
      return { ...state, dateRange: action.payload };
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

export function addTransactionAction(transaction) {
  return {
    type: ADD_TRANSACTION,
    payload: transaction,
  }
}

export function getCategoriesAction(categories) {
  return {
    type: GET_CATEGORIES,
    payload: categories,   
  } 
}

export function getHashtagsAction(hashtags) {
  return {
    type: GET_HASHTAGS,
    payload: hashtags,   
  } 
}

export function runLoaderAction() {
  return {
    type: RUN_LOADER,
    payload: true,   
  } 
}

export function hideLoaderAction() {
  return {
    type: HIDE_LOADER,
    payload: false,   
  } 
}

export function setPeriodAction(period) {
  return {
    type: SET_PERIOD,
    payload: period,   
  } 
}

export function setDatesAction(dateRange) {
  return {
    type: SET_DATES,
    payload: dateRange,
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

export function addTransaction(dispatch, transactionData, cb) {
  axios.post(`${REACT_APP_BACKEND_URL}/addtransaction`, {transactionData})
    .then((res) => {
      dispatch(addTransactionAction(res.data));
      cb();
    });
}

export function getCategories(dispatch) {
  axios.get(`${REACT_APP_BACKEND_URL}/getcategories`)
    .then((res) => {
      dispatch(getCategoriesAction(res.data));
    });
}

export function getHashTags(dispatch) {
  axios.get(`${REACT_APP_BACKEND_URL}/gethashtags`)
    .then((res) => {
      dispatch(getHashtagsAction(res.data));
  });
}

export function runLoader(dispatch) {
  dispatch(runLoaderAction());
}

export function hideLoader(dispatch) {
  dispatch(hideLoaderAction());
}

export function setPeriodChoice(dispatch, periodChoice) {
  dispatch(setPeriodAction(periodChoice));
}

export function setDates(dispatch, dateRange) {
  dispatch(setDatesAction(dateRange));
}