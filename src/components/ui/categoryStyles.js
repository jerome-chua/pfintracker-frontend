const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f', '#A0937D', '#5F939A'];

export const expenseCategories = [
  { type: 'Bills', amount: 0, color: expenseColors[0] },
  { type: 'Transportation', amount: 0, color: expenseColors[1] },
  { type: 'Shopping', amount: 0, color: expenseColors[2] },
  { type: 'Sports', amount: 0, color: expenseColors[3] },
  { type: 'Food & Drinks', amount: 0, color: expenseColors[4] },
  { type: 'Books', amount: 0, color: expenseColors[5] },
  { type: 'House', amount: 0, color: expenseColors[6] },
  { type: 'Entertainment', amount: 0, color: expenseColors[7] },
  { type: 'Investment', amount: 0, color: expenseColors[8] },
  { type: 'Church', amount: 0, color: expenseColors[9] },
  { type: 'Stationery', amount: 0, color: expenseColors[10] },
  { type: 'Haircuts', amount: 0, color: expenseColors[11] },
  { type: 'Church', amount: 0, color: expenseColors[12] },
];

const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d'];

export const incomeCategories = [
  { type: 'Business', amount: 0, color: incomeColors[0] },
  { type: 'Investments', amount: 0, color: incomeColors[1] },
  { type: 'Extra Income', amount: 0, color: incomeColors[2] },
  { type: 'Deposits', amount: 0, color: incomeColors[3] },
  { type: 'Rental Income', amount: 0, color: incomeColors[4] },
  { type: 'Gifts', amount: 0, color: incomeColors[5] },
  { type: 'Salary', amount: 0, color: incomeColors[6] },
  { type: 'Savings', amount: 0, color: incomeColors[7] },
];

export const resetCategories = () => {
  incomeCategories.forEach((cat) => cat.amount = 0);
  expenseCategories.forEach((cat) => cat.amount = 0);
};