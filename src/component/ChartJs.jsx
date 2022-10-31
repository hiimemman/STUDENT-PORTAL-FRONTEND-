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

    const [data, setData] = useState({
        labels: ['Employee', 'Professor', 'Student', 'Faculty', 'Course', 'Subject', 'Section'],
        datasets:[
            {
                label: 'Active',
                data: props.data,
                backgroundColor:[
                    'rgba(255, 99, 132, 0.5)',
                    
                ]
            }
        ]
    })
    
    useEffect(() =>{
        setData((prev) => prev = {
            labels: ['Employee', 'Professor', 'Student', 'Faculty', 'Course', 'Subject', 'Section'],
            datasets:[
                {
                    label: 'Population',
                    data: props.data,
                    backgroundColor:[
                        'rgba(255, 99, 132, 0.5)',
                        
                    ]
                }
            ]
        })
        return () =>{
            //exit in memory
        }
    }, [currentPage]);
    return(
        <>
        {console.log(props.data)}
       <Bar data ={data} option ={{ maintainAspectRatio: false }} options = {options}/>
        </>
    )
}