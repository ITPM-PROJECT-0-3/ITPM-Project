import React, { useEffect } from "react";
import ApexCharts from "apexcharts";

export default function ExaminerChart() {
  useEffect(() => {
    // ApexCharts options
    const options = {
      series: [
        {
          name: "proposalMarks",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "progreel1Marks",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: " progress2Marks",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "FinalPresantationMarks",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: {
            total: {
              enabled: true,
              offsetX: 0,
              style: {
                fontSize: "13px",
                fontWeight: 900,
              },
            },
          },
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "Research Markks Rate",
      },
      xaxis: {
        categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    };

    // Create ApexCharts instance
    const chart = new ApexCharts(
      document.querySelector("#examiner-chart"),
      options
    );

    // Render the chart
    chart.render();

    // Clean up function to destroy the chart when component unmounts
    return () => {
      chart.destroy();
    };
  }, []);

  return <div id="examiner-chart"></div>;
}
