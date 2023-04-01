import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import FeedbackForm from './feedback_form';

const Report = () => {
  const {roomId} = useParams();
  const location = useLocation();
  const userName = location.state;
  const [list, setList] = useState([])
  const intervieweeList=[]
  
  useEffect(()=>{
    async function users() {
      try {
        await axios.get(`http://localhost:5000/report/${roomId}`)
          .then(res=> setList(res.data))
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
  return (<div>
      {list.length===0?
        (<div>Loading...</div>)
        :
        (list.client.map((val)=>{
          if(val.status)
          {
            intervieweeList.push(val)
          }
        }))}
        <FeedbackForm intervieweeList={intervieweeList} len={intervieweeList.length} interviewer={userName} roomId={roomId}/>
      </div> );
}
 
export default Report;