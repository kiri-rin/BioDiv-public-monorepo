import { ChartConfiguration } from "chart.js";
import { Chart } from "chart.js";
import { MatrixController, MatrixElement } from "chartjs-chart-matrix";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(MatrixController, MatrixElement);
Chart.register(ChartDataLabels);

export const getCorrelationChart = (
  correlationMatrix: number[][],
  labels: string[]
) => {
  const chart: ChartConfiguration = {
    type: "matrix",
    data: {
      //@ts-ignore
      datasets: correlationMatrix.map((row, i) => ({
        datalabels: {
          align: "center",
          anchor: "center",
        },
        data: row.map((value, j) => ({
          x: i,
          y: j,
          v: value,
        })),

        backgroundColor: (context: any) => {
          const value = context.dataset.data[context.dataIndex].v;
          return value > 0
            ? `rgba(255, 0, 0, ${value})`
            : `rgba(0, 0,255, ${-value})`; // Пример цветовой шкалы
        },
        width: ({ chart }) => (chart.chartArea || {}).width / labels.length - 1,
        height: ({ chart }) =>
          (chart.chartArea || {}).height / labels.length - 1,
      })),
    },

    options: {
      scales: {
        x: {
          type: "linear",
          display: true,
          position: "top",
          ticks: {
            stepSize: 1,
            autoSkip: false,
            callback: (val, i) => labels[i],
          },
        },
        y: {
          type: "linear",
          position: "left",
          display: true,
          ticks: {
            stepSize: 1,
            autoSkip: false,
            callback: (val, i) => [...labels].reverse()[i],
          },
        },
      },
      plugins: {
        datalabels: {
          color: "black",
          display: true,
          font: {
            weight: "bold",
          },
          formatter: (data) => data.v.toFixed(2),
        },
        legend: {
          display: false,
        },
      },
      responsive: false,
    },
  };
  return chart;
};
