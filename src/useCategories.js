import React, { useContext } from "react";
import { savifyContext } from "./store.js";
import { incomeCategories, expenseCategories, resetCategories } from './ui/categoryStyles.js';


export default function useCategories(type) {
  resetCategories();

  const {store, } = useContext(savifyContext);
  const { transactions } = store;

  // Filter for income | expense
  const chosenTransacts = transactions.filter((row) => row.transactionType === type)

  // Calculate total amount for income | expense
  const total = chosenTransacts.reduce((acc, currVal) => 
    acc += currVal.amount, 0
  );

  // Filter for income | expense typed categories
  const categories = type === 'Income' ? incomeCategories : expenseCategories;
  chosenTransacts.forEach((transaction) => {
    // Return first category found
    const category = categories.find((cat) => cat.category === transaction.category);

    if (category) {
      category.amount += transaction.amount;
    }
  });

  const filteredCategories = categories.filter((cat) => cat.amount > 0);



  return { filteredCategories, total };
};

}