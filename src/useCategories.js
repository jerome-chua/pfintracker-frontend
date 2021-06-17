import { useContext } from "react";
import { SavifyContext } from "./store.js";
import { incomeCategories, expenseCategories, resetCategories } from './components/ui/categoryStyles.js';
import moment from 'moment';


export default function useCategories(type) {
  // resetCategories();

  const {store, } = useContext(SavifyContext);
  const { transactions, periodChoice, dateRange } = store;


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

  const formatDate = (date) => {
  const year = moment(date).format("YYYY");
  const month = moment(date).format("MM");
  const day = moment(date).format("DD");
  const dateFormat = [year, month, day].map(i => parseInt(i))

  return moment(dateFormat);
  }

  const start = formatDate(dateRange.startDate);
  const end = formatDate(dateRange.endDate);

  let startDate = moment(dateRange.startDate);
  let endDate = moment(dateRange.endDate);


  const labels = [];
  if (periodChoice === "month") {
    const label = moment(dateRange.startDate).format("MMM YYYY");
    const diff =  Math.ceil(end.diff(start, 'months', true));

    while (endDate > startDate) {
      console.log("Check" , endDate, startDate)
      labels.push(moment(startDate).format("MMM YYYY"));
      startDate.add(1, 'month');  
   }
    
  } else if (periodChoice === "week") {
    const label = moment(dateRange.startDate).format("MMM YYYY");
    console.log("label", label);
  } else {
    console.log("here in day")
  }
  
  // Month Data
  const timeData = {
    labels: labels,
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
