import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './reportCard.css'

const ReportCard =()=>{
    const {username} = useParams();
    const [data, setData] = useState([]);
    useEffect(()=>{
    async function users() {
      try {
        await axios.get(`http://localhost:5000/reportCard/${username}`)
          .then(res=> setData(res.data))
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
    <div>
        {console.log(data)}
      {data.length===0?
        (<div>No data Found</div>)
        :
        (data.map((val, i)=>{
          return (
            <ul key={i} className="cards">
               <li className="Reportcard">
                        
                    <div className="row">
                        <div className="column"> <img className="icon" src="https://assets.codepen.io/7287362/Frank_bw2400.png" alt=""/> </div>
                        <div class="column">
                        <h3 class="card-title"><b>{val.by}</b></h3>
                        <br/>
                        <p class="card-sub">Interviewer</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div><b>Work Experience:</b> {val.feedback.work.score}/5 {val.feedback.work.comment}</div>
                        <div> <b>Technical Skills:</b> {val.feedback.technical.score}/5 {val.feedback.technical.comment}</div>
                        <div><b>Verbal Communication: </b>{val.feedback.verbal.score}/5 {val.feedback.verbal.comment}</div>
                        <div><b>Candidate Enthusiasm: </b>{val.feedback.enth.score}/5 {val.feedback.enth.comment}</div>
                        <div><b>Additional Comment: </b>{val.feedback.addComt.comment}</div>
                    </div>
                    
                </li>
                
                
                

            </ul>
          )
        }))}
        
      </div>
    )
}
export default ReportCard;