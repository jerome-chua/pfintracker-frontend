const expenseColors = ['#b50d12', '#bf2f1f', '#c9452c', '#d3583a', '#dc6a48', '#e57c58', '#ee8d68', '#f79d79', '#ffae8a', '#cc474b', '#f55b5f', '#A0937D', '#5F939A'];

export const expenseCategories = [
  { category: 'Bills', amount: 0, color: expenseColors[0] },
  { category: 'Transportation', amount: 0, color: expenseColors[1] },
  { category: 'Shopping', amount: 10, color: expenseColors[2] },
  { category: 'Sports', amount: 10, color: expenseColors[3] },
  { category: 'Food & Drinks', amount: 0, color: expenseColors[4] },
  { category: 'Books', amount: 0, color: expenseColors[5] },
  { category: 'House', amount: 10, color: expenseColors[6] },
  { category: 'Entertainment', amount: 0, color: expenseColors[7] },
  { category: 'Investment', amount: 20, color: expenseColors[8] },
  { category: 'Church', amount: 0, color: expenseColors[9] },
  { category: 'Stationery', amount: 30, color: expenseColors[10] },
  { category: 'Haircuts', amount: 30, color: expenseColors[11] },
  { category: 'Church', amount: 30, color: expenseColors[12] },
];

const incomeColors = ['#123123', '#154731', '#165f40', '#16784f', '#14915f', '#10ac6e', '#0bc77e', '#04e38d'];

export const incomeCategories = [
  { category: 'Business', amount: 0, color: incomeColors[0] },
  { category: 'Investments', amount: 0, color: incomeColors[1] },
  { category: 'Extra Income', amount: 0, color: incomeColors[2] },
  { category: 'Deposits', amount: 0, color: incomeColors[3] },
  { category: 'Rental Income', amount: 0, color: incomeColors[4] },
  { category: 'Gifts', amount: 0, color: incomeColors[5] },
  { category: 'Salary', amount: 0, color: incomeColors[6] },
  { category: 'Savings', amount: 0, color: incomeColors[7] },
];

export const resetCategories = () => {
  incomeCategories.forEach((cat) => cat.amount = 0);
  expenseCategories.forEach((cat) => cat.amount = 0);
};