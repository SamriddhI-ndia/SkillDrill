import React, { useState, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);
const PieChart = (expressions) =>{
  console.log(expressions)
  //const data = useRef(null);
  const data = ({
    
    labels: ['Angry', 'Happy', 'Sad', 'Disgusted', 'Neutral', 'Surprised', 'Fearful'],
    datasets: [
      {
        label: '# of Votes',
        data: [expressions.expressions.angry, 
                expressions.expressions.happy, 
                expressions.expressions.sad, 
                expressions.expressions.disgusted, 
                expressions.expressions.neutral,
                expressions.expressions.surprised, 
                expressions.expressions.fearful],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
          'rgba(255, 159, 64, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        options: { 
          legend: {
              labels: {
                  fontColor: "blue",
                  fontSize: 18
              }
          },
        }
      },
      
    ]
  })
  return (data==null||data==undefined?<div>Loading...</div>:<Pie className="pieChart" data={data}></Pie>)
}




export default PieChart;
// export function PieChart(expressions) {
//   return <Pie data={data} />;
// }
