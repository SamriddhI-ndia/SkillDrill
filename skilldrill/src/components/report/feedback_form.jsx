import React, {useEffect, useState} from  "react";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
import '../../Room.css'
import PieChart from "../reportCard/PieChart";

const FeedbackForm = ({intervieweeList, len, interviewer, roomId})=>{
    console.log(len)
    const interviewerName=interviewer.userName;
    const [textWork, setTextWork]=useState("");
    const [textTechnical, setTextTechnical]=useState("");
    const [textVerbal, setTextVerbal]=useState("");
    const [textEnth, setTextEnth]=useState("");
    const [textAdd, setTextAdd]=useState("");
    const [scoreWork, setScoreWork]=useState(0);
    const [scoreTechnical, setScoreTechnical]=useState(0);
    const [scoreVerbal, setScoreVerbal]=useState(0);
    const [scoreEnth, setScoreEnth]=useState(0);
    const [next, setNext]=useState(0)
    const location = useNavigate();
    const [data, setData] = useState([]);
    // useEffect(()=>{
    //  x   async function exp(){
    //     try {
    //         console.log("..................try kar raha hai", intervieweeList, roomId);
    //         await axios.get(`http://localhost:5000/expression/${intervieweeList[next].username}/${roomId}}`)
    //       .then(res=> {
    //         setData(res.data)
    //         console.log(res.data)})
    //       .catch(e=>{
    //         console.log(e)
    //       })} catch(e){
    //         console.log("Pie chart data not fetched.");
    //     }
    // }
    // exp();
    // },[next])
   
    async function submit(){
        
        if(scoreWork>5 || scoreWork<0 || scoreTechnical>5 || scoreTechnical<0 || scoreVerbal>5 || scoreVerbal<0 || scoreEnth>5 || scoreEnth<0)
        {
            alert("Score range is not correct :(");
            // toast.warning("Score range is not correct :(");
        }
        else{
        let tempData = {
            to:intervieweeList[next].username,
            info:{
                by: interviewerName,
                roomId: roomId,
                feedback: {
                    work: {
                        score: scoreWork,
                        comment: textWork
                    },
                    technical: {
                        score: scoreTechnical,
                        comment: textTechnical
                    },
                    verbal: {
                        score: scoreVerbal,
                        comment: textVerbal
                    },
                    enth: {
                        score: scoreEnth,
                        comment: textEnth
                    },
                    addComt: {
                        comment: textAdd
                    }
                }
            }
        }

        console.log("tempData", tempData);
        try {
                await axios.post("http://localhost:5000/feedback", 
                    tempData)
                .then(res=>{
                    if(res.data==="Successful")
                    {
                        
                        if(next+1==len){
                            toast.success("Feedback Submitted");
                            location("/")
                        }
                        setScoreEnth(0);
                        setScoreTechnical(0);
                        setScoreVerbal(0);
                        setScoreWork(0);
                        setTextAdd("");
                        setTextEnth("");
                        setTextTechnical("");
                        setTextVerbal("");
                        setTextWork("");
                        setNext(next+1)
                    }
                    else 
                    {
                        toast.error("try again")
                    }
                })
                .catch(e=>{
                    toast.error("Something went wrong, try again ");
                    console.log(e);
                })
            }
            catch{
                console.log("something wrong ");
            }
        }
        
        
    }
    return (
        <div>
        {len===0?(<div>NO Interviwee</div>) : (<div className="homePageWrapper">
            
        <div className="feedbackWrapper">
        <h4 className="mainLabel">Feedback for {intervieweeList[next].username}</h4>
        <div className="inputGroup">
            <div className="feedbackGroup">
                <span className="feedbackLabel">Work Experience : </span> 
                <input type="number" min="0" max="5" step="1" className="feedbackInput" placeholder="0" onChange={(e)=>{setScoreWork(e.target.value)}} value={scoreWork}/>
                <span className="feedbackLabel">/5</span>
                <input type="text" onChange={(e)=>{setTextWork(e.target.value)}} placeholder="Comment" className="feedbackInput" value={textWork}/>
            </div>
            <div className="feedbackGroup">
                <span className="feedbackLabel">Technical Skill : </span> 
                <input type="number" min="0" max="5" step="1" className="feedbackInput" placeholder="0" onChange={(e)=>{setScoreTechnical(e.target.value)}} value={scoreTechnical}/>
                <span className="feedbackLabel">/5</span>
                <input type="text" onChange={(e)=>{setTextTechnical(e.target.value)}} placeholder="Comment" className="feedbackInput" value={textTechnical}/>
            </div>
            <div className="feedbackGroup">
                <span className="feedbackLabel">Verbal Communication : </span> 
                <input type="number" min="0" max="5" step="1" className="feedbackInput" placeholder="0" onChange={(e)=>{setScoreVerbal(e.target.value)}} value={scoreVerbal}/>
                <span className="feedbackLabel">/5</span>
                <input type="text" onChange={(e)=>{setTextVerbal(e.target.value)}} placeholder="Comment" className="feedbackInput" value={textVerbal}/>
            </div>
            <div className="feedbackGroup">
                <span className="feedbackLabel">Candidate Enthusiasm : </span> 
                <input type="number" min="0" max="5" step="1" className="feedbackInput" placeholder="0" onChange={(e)=>{setScoreEnth(e.target.value)}} value={scoreEnth}/>
                <span className="feedbackLabel">/5</span>
                <input type="text" onChange={(e)=>{setTextEnth(e.target.value)}} placeholder="Comment" className="feedbackInput" value={textEnth}/>
            </div>
            <div className="feedbackGroup">
                <span className="feedbackLabel">Additional Feedback : </span> 
                <input type="text" onChange={(e)=>{setTextAdd(e.target.value)}} placeholder="Additional Feedback" className="feedbackInput" value={textAdd}/>
            </div>
           
            <center><button className="butn joinBtn" onClick={submit}>{next+1===len?(`SUBMIT`):(`NEXT`)} </button>
            </center>
        </div>
        </div>
    
    </div>)}
    </div> 
    )
}
export default FeedbackForm;