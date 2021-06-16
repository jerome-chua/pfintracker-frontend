import { useContext } from "react";
import { SavifyContext } from "./store.js";
import { incomeCategories, expenseCategories, resetCategories } from './components/ui/categoryStyles.js';


export default function useCategories(type) {
  // resetCategories();

  const {store, } = useContext(SavifyContext);
  const { transactions, periodChoice } = store;


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
  
  // Leave out categories with $0 in doughtnut chart display
  const filteredCategories = categories.filter((cat) => cat.amount > 0);
  
  const catData = {
    datasets: [{ 
      data: filteredCategories.map((cat) => cat.amount), 
      backgroundColor: filteredCategories.map((cat) => cat.color)
    }],
    labels: filteredCategories.map((cat) => cat.category),
  };


  // Month Data
  const timeData = {
    labels: ['1', '2', '3', '4', '5', '6'],
    datasets: [
      {
        label: 'Account Balance',
        data: [12, 19, 3, 5, 2, 3],
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
    ],
  };

  // Weekly Data

  // Daily Data

  return { filteredCategories, total, catData, timeData };
};
