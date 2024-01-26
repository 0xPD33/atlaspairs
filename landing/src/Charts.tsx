import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const Chart = () => {
  const data = {
    labels: [
      "Burn",
      "Liquidity",
      "Public Sale",
      "Team",
      "Development",
      "Airdrop",
      "Incentives",
      "Treasury",
      "Marketing",
      "Private Sale",
    ],
    datasets: [
      {
        label: "$ATLAS Distribution",
        data: [11.2, 10, 13.8, 15, 5, 5, 5, 15, 10, 10],
        backgroundColor: [
          "rgba(255, 30, 0, 0.5)",
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(199, 199, 199, 0.5)",
          "rgba(83, 102, 255, 0.5)",
          "rgba(32, 111, 180, 0.5)",
        ],
        borderColor: [
          "rgba(255, 30, 0, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(159, 159, 159, 1)",
          "rgba(83, 102, 255, 1)",
          "rgba(32, 111, 180, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default Chart;
