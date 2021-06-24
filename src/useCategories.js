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

  const labels = [];
  const dataPoints = [];
  let startDate = moment(dateRange.startDate);
  let endDate = moment(dateRange.endDate);

  const tally = (labelDate, periodChoice) => {
    let totalSavings;

    const matchedTransacts = transactions.filter((row) => moment(row.createdAt, 'YYYY-MM-DD').isSame(moment(labelDate, 'YYYY-MM-DD'), periodChoice));

    totalSavings = matchedTransacts.reduce(
      (acc, currVal) =>
        currVal.transactionType === "Income"
          ? acc + currVal.amount
          : acc - currVal.amount,
      0
    );
    return totalSavings;
  }


  if (periodChoice === "month") {
    while (moment(dateRange.endDate, "DD-MM-YYYY").add('month', 1) > startDate) {
      // Labels
      const eachMonthLabel = moment(startDate).format("MMM 'YY");
      labels.push(eachMonthLabel);

      // Data
      dataPoints.push(tally(startDate, 'month'));
      startDate.add(1, 'month');
    }
  } 
  else if (periodChoice === "week") {
    while (moment(dateRange.endDate, "DD-MM-YYYY").add('days', 7) > startDate) {
      // Labels
      const weekStart = startDate.startOf('week').format("DD MMM").toString()
      const weekEnd = startDate.endOf('week').format("DD MMM").toString();
      const eachWeekLabel = `${weekStart} - ${weekEnd}`
      labels.push(eachWeekLabel);

      // Data
      dataPoints.push(tally(startDate, 'week'));
      startDate.add(7, 'days');
    }
  } 
  else {
    while (endDate > startDate) {
      // Labels
      const eachDay = moment(startDate).format("YYYY-MM-DD");
      labels.push(eachDay);   

      // Data
      dataPoints.push(tally(eachDay, 'day'));
      startDate.add(1, 'days');
    }
  }

  const cumulative = [];
  dataPoints.reduce((a, b, i) => {
    return cumulative[i] = a + b
  }, 0)
  
  // Day/Week/Month Data
  const timeData = {
    labels: labels, 
    datasets: [
      {
        label: 'Savings',
        data: cumulative,
        fill: true,
        backgroundColor: 'rgb(23, 112, 110, 0.2)',
        borderColor: 'rgb(23, 112, 110, 0.8)',
        pointHoverBorderWidth: 7,
        pointRadius: 0,
        pointHitRadius: 30,
      },
    ],
  };

  return { filteredCategories, total, timeData };
};
