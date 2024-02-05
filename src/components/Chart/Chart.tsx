"use client";

import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import ThemeContext from "@/context/themeContext";

import { FC, useContext } from "react";
import { Bar } from "react-chartjs-2";

import { Booking } from "@/models/booking";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  // const labels = userBookings.map(booking => booking.hotelRoom.name);
  const labels = ["Delux Suite", "Basic Room", "Suit"];
  // const amountSpent = userBookings.map(booking => booking.totalPrice);
  const amountSpent = [25000, 5100, 6000];

  const { darkTheme } = useContext(ThemeContext);

  const chartColors = darkTheme
    ? {
        backgroundColor: "#db2777",
        hoverBackgroundColor: "#ec4899",
      }
    : {
        backgroundColor: "#4f46e5",
        hoverBackgroundColor: "#6366f1",
      };

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount spent",
            data: amountSpent,
            borderWidth: 1,
            ...chartColors,
          },
        ],
      }}
    />
  );
};

export default Chart;
