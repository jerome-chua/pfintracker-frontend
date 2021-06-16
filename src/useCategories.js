import React, {useContext} from "react";
import { savifyContext } from "./store.js";


export default function useCategories(type) {
  const {store, } = useContext(savifyContext);
  const { transactions } = store;

  const chosenTransacts = transactions.filter((row) => row.transactionType === type)

  const total = chosenTransacts.reduce((acc, currVal) => 
    acc += currVal.amount, 0
  );

  const categories = type === 'Income' ? incomeCategories : expenseCategories;

}