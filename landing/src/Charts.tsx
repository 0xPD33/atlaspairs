import React from "react";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const Chart = () => {
  const data = {
    labels: [
      "Liquidity",
      "Launchpad",
      "Private Sale",
      "Treasury",
      "Incentives",
      "Airdrop",
      "Team",
      "Development",
    ],
    datasets: [
      {
        label: "$ATLAS Distribution",
        data: [10, 10, 10, 30, 5, 5, 15, 15],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(199, 199, 199, 0.2)",
          "rgba(83, 102, 255, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(159, 159, 159, 1)",
          "rgba(83, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};

export default Chart;
