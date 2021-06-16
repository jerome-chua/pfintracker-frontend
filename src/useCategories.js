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
    // Increment each category amount for income | expense type
    if (category) {
      category.amount += transaction.amount;
    }
  });
  
  // Leave out categories with $0 in doughtnut chart display where
  const filteredCategories = categories.filter((cat) => cat.amount > 0);

  const catData = {
    dataset: [{ 
      data: filteredCategories.map((cat) => cat.amount), 
      bgColor: filteredCategories.map((cat) => cat.color)
    }],
    label: filteredCategories.map((cat) => cat.category)
  } 

  return { filteredCategories, total, catData };
};
