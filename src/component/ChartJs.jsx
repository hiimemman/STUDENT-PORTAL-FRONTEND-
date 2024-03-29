import { Bar } from 'react-chartjs-2';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart,CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend } from 'chart.js';
import { useEffect } from 'react';

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  

const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Asian Institute of Science and Technology  Bar Chart',
      },
    },
  };

export function ChartJs(props){

      //page current state
      const currentPage = useSelector(state => (state.selectedPage.value));

    return(
        <>
       <Bar data ={props.dataChart} option ={{ maintainAspectRatio: false }} options = {options} />
        </>
    )
}