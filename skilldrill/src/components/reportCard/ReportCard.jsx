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
            <div key={i}>
                <ul className="cards">
                    <li className="card">
                        <div>
                    <div className="row">
                        <div className="column"> <img className="icon" src="https://assets.codepen.io/7287362/Frank_bw2400.png" alt=""/> </div>
                        <div class="column">
                        <h3 class="card-title"><b>{val.by}</b></h3>
                        <br/>
                        <p class="card-sub">Interviewer</p>
                        </div>
                    </div>
                    <div class="card-content">
                        <div>Work Experience: {val.feedback.work.score}/5 {val.feedback.work.comment}</div>
                        <div>Technical Skills: {val.feedback.technical.score}/5 {val.feedback.technical.comment}</div>
                        <div>Verbal Communication: {val.feedback.verbal.score}/5 {val.feedback.verbal.comment}</div>
                        <div>Candidate Enthusiasm: {val.feedback.enth.score}/5 {val.feedback.enth.comment}</div>
                        <div>Additional Comment: {val.feedback.addComt.comment}</div>
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