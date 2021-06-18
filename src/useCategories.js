import { useContext } from "react";
import { SavifyContext } from "./store.js";
import { incomeCategories, expenseCategories } from './components/ui/categoryStyles.js';
import moment from 'moment';

export default function useCategories(type) {
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

  /* 
    Put these calculations in Dashboard.jsx / TimeChart.jsx ?
  */

  const labels = [];
  const dataPoints = [];
  let startDate = moment(dateRange.startDate);
  let endDate = moment(dateRange.endDate);

  const tally = (labelDate, periodChoice='day') => {
    const matchedTransacts = transactions.filter((row) => moment(row.createdAt, 'YYYY-MM-DD').isSame(moment(labelDate, 'YYYY-MM-DD'), periodChoice));

    const dayTotal = matchedTransacts.reduce(
      (acc, currVal) =>
        currVal.transactionType = "Income"
          ? acc + currVal.amount
          : acc - currVal.amount,
      0
    );

    return dayTotal;
  }


  if (periodChoice === "month") {
    while (endDate > startDate) {
      const eachMonth = moment(startDate).format("MMM 'YY");
      labels.push(eachMonth);
      startDate.add(1, 'month'); 
    }
  } 
  else if (periodChoice === "week") {
    while (moment(dateRange.endDate, "DD-MM-YYYY").add('days', 7) > startDate) {
      const weekStart = startDate.startOf('week').format("DD MMM").toString()
      const weekEnd = startDate.endOf('week').format("DD MMM").toString();
      const eachWeek = `${weekStart} - ${weekEnd}`
      labels.push(eachWeek);
      startDate.add(7, 'days'); 
    }
  } 
  else {
    while (endDate > startDate) {
      const eachDay = moment(startDate).format("YYYY-MM-DD");
      labels.push(eachDay);
      startDate.add(1, 'days');

      dataPoints.push(tally(eachDay, 'day'));
    }
  }

  const cumulative = [];
  dataPoints.reduce((a, b, i) => {
    return cumulative[i] = a + b
  }, 0)

  const timeTotal = Math.max(...cumulative);
  
  // Day/Week/Month Data
  const timeData = {
    labels: labels, 
    datasets: [
      {
        label: 'Savings',
        data: cumulative,
        fill: false,
        backgroundColor: 'rgb(23, 112, 110)',
        borderColor: 'rgb(23, 112, 110, 0.3)',
      },
    ],
  };

  return { filteredCategories, total, catData, timeData, timeTotal };
};
