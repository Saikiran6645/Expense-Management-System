// src/components/Chart/PieChart.js
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ incomes, expenses }) => {
  const incomeTotal = incomes.reduce((acc, income) => acc + income.amount, 0);
  const expenseTotal = expenses.reduce(
    (acc, expense) => acc + expense.amount,
    0
  );

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
