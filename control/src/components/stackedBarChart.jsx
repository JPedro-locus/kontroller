import React from 'react';
import Chart from 'react-apexcharts';

export default function StackedBarChart() {
  const options = {
    chart: {
      type: 'bar',
      stacked: true,
      background: 'transparent',
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
      },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    xaxis: {
      categories: ['1990', '2000', '2010', '2020'],
      labels: { style: { colors: '#000', fontSize: '14px' } },
    },
    grid: { show: false },
    legend: {
      position: 'bottom',
      markers: { radius: 12, width: 10, height: 10 },
      itemMargin: { horizontal: 16 },
    },
    fill: {
      opacity: 1,
    },
    colors: ['rgba(0, 64, 254, 1)', 'rgba(0, 64, 254, 0.3)'],
  };

  const series = [
    {
      name: 'Non-fiction',
      data: [30, 55, 50, 70],
    },
    {
      name: 'Fiction',
      data: [40, 60, 55, 80],
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={350}
      width="100%"
    />
  );
}
