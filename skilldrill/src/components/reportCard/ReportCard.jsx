import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './reportCard.css'
import PieChart from './PieChart';

const ReportCard =()=>{
    const {username} = useParams();
    const [data, setData] = useState([]);
    useEffect(()=>{
    async function users() {
      try {
        await axios.get(`http://localhost:5000/reportCard/${username}`)
          .then(
            res=>{ setData(res.data);
            console.log(res.data)})
          .catch(e=>{
            console.log(e)
          })
      }
      catch(e) {
        console.log(e)
      }
    }
    users();
  },[])
    return (
    <div className="cards">
        {console.log(data)}
      {data.length===0?
        (<div>No data Found</div>)
        :
        (data.map((val, i)=>{
          return (
            <div >
            <ul key={i} >
               <li className="Reportcard">
                        
                    <div className="header">
                        {/* <div className="column"> <img className="icon" src="https://assets.codepen.io/7287362/Frank_bw2400.png" alt=""/> </div>
                        <div class="column">
                        <h3 class="card-title"><b>{val.by}</b></h3>
                        <br/>
                        <p class="card-sub">Interviewer</p>
                        </div> */}
                        
  <img src="https://assets.codepen.io/7287362/Frank_bw2400.png" alt="logo" />
  <h3>{val.by}</h3>

  <p>Interviewer</p>
</div>

                    <br></br>
                    <hr/>
                    <div className="card-content report">
                        {
                        val.feedback?(
                          <div className="feedback">
                        <div><b>Work Experience:</b> {val.feedback.work.score}/5 {val.feedback.work.comment}</div>
                        <div> <b>Technical Skills:</b> {val.feedback.technical.score}/5 {val.feedback.technical.comment}</div>
                        <div><b>Verbal Communication: </b>{val.feedback.verbal.score}/5 {val.feedback.verbal.comment}</div>
                        <div><b>Candidate Enthusiasm: </b>{val.feedback.enth.score}/5 {val.feedback.enth.comment}</div>
                        <div><b>Additional Comment: </b>{val.feedback.addComt.comment}</div></div>):(<div></div>)
                        }
                         <div className="expression">
                        {val.expressions?(<PieChart expressions={val.expressions}></PieChart>):<div></div>}
                    </div>
                    </div>
                   
                </li>
                
                
                

            </ul>
            </div>
          )
        }))}
        
        
      </div>
    )
}
export default ReportCard;