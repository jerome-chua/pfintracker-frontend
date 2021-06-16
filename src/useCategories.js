import React, { useContext } from "react";
import { SavifyContext } from "./store.js";
import { incomeCategories, expenseCategories, resetCategories } from './components/ui/categoryStyles.js';


export default function useCategories(type) {
  // resetCategories();

  const {store, } = useContext(SavifyContext);
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
    // Increment each category amount for income | expense type
    if (category) {
      category.amount += transaction.amount;
    }
  });
  
  // Leave out categories with $0 in doughtnut chart display where
  const filteredCategories = categories.filter((cat) => cat.amount > 0);
  
  const catData = {
    datasets: [{ 
      data: filteredCategories.map((cat) => cat.amount), 
      backgroundColor: filteredCategories.map((cat) => cat.color)
    }],
    labels: filteredCategories.map((cat) => cat.category),
  };

  return { filteredCategories, total, catData };
};
