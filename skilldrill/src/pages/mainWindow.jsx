import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { useState,useRef, useReducer } from "react";
import { initSocket } from "../socket";
import Client from '../components/mainWindow/Client';
import CodeEditor from "../components/mainWindow/CodeEditor";
import ACTIONS from "../components/mainWindow/Actions";
import { useLocation,useNavigate,Navigate,useParams } from "react-router-dom";
import WhiteBoard from "../components/Board/WhiteBoard";
import AudioVideo from "../components/audioVideo/AudioVideo";
import Peer from 'peerjs';
import {v4 as uuidV4} from 'uuid';
import { peerReducer } from "../redux/peerReducer";
import { addPeerAction } from "../redux/peerActions";
import axios from "axios";

const Editor=({isInterviewee, userName})=>{ 
    const socketRef = useRef(null); //component don't re-render after any change in state of useRef. 
    const location = useLocation();
    const codeRef = useRef(null);
    const reactNavigator = useNavigate();
    const {roomId} =useParams();
    const [clients,setClients]=useState([]);
    const canvasRef = useRef(null);
    const [prevState, setPrevState] = useState('CodeEditor');
    const [me, setMe] = useState();
    const [stream, setStream] = useState();
    const socketId = uuidV4();
    const [peers, dispatch]=useReducer(peerReducer,{});
    const neutral = useRef(0);
    const angry = useRef(0);
    const disgusted = useRef(0);
    const sad = useRef(0);
    const happy = useRef(0);
    const fearful = useRef(0);
    const surprised = useRef(0);

    useEffect(()=>{
        const init =async()=>{
            console.log("aaya aaya")
            socketRef.current=await initSocket();
            socketRef.current.on('connect_error', (err)=>handleErrors(err));
            socketRef.current.on('connect_failed', (err)=>handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('socket connection failed, try again later.');
                reactNavigator('/');
            }
            
            const peer = new Peer(socketId);
            setMe(peer); 
            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: userName,
                socketId,
                isInterviewee
            });
            
            //Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, ({clients, username, socketId})=>{
                if(username!== userName) {
                    toast.success(`${username} joined the room`);
                    console.log(`${username} joined`);
                }
                
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
                socketRef.current.emit(ACTIONS.SYNC_WHITEBOARD, {
                    canvasImage: canvasRef.current.toDataURL("image/png"),
                    socketId,
                });
            })

            // Listening for disconnected 
            socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, userName})=>{
                toast.success(`${userName} left the room`);
                setClients((prev)=>{
                    return prev.filter(client => client.socketId!=socketId)
                })
            })
        }
        init();
        // cleaning listener to avoid memory leak problem 
        return () => {
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        }
    }, []);
    useEffect(()=>{
        if(!me) return;
        if(!stream) return;
        socketRef.current.on("peer-joined",({socketId})=>{
            const call=me.call(socketId, stream);
            call.on('stream',(peerStream)=>{
                dispatch(addPeerAction(socketId, peerStream))
            })
        }) 
        me.on('call',(call)=>{
            call.answer(stream);
            call.on('stream',(peerStream)=>{
                dispatch(addPeerAction(call.peer, peerStream))
            })
        })
    },[me, stream])

    console.log({peers});
    
    const avatar= clients.map((client)=>(<Client userName={client.userName} key={client.socketId}/>)
    )

    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID has been copied to your clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }

    async function leaveRoom() {
        if(isInterviewee){
            //post request to room with expressions data.
        const expressionFeedback = {
            "username":userName,
            "roomId":roomId,
            "expressions":{ neutral: neutral.current, 
                            sad: sad.current, 
                            happy: happy.current, 
                            disgusted: disgusted.current, 
                            surprised: surprised.current, 
                            fearful: fearful.current, 
                            angry: angry.current}
        }
        try{
            console.log(expressionFeedback);
            await axios.post("http://localhost:5000/expressions", expressionFeedback)
            .then(res=>{
                if(res.data==="Successful")
                {
                    toast.success("Left room successfully.")
                }})
            .catch(e=>{
                toast.error("Expressions post failed")
            })
        }catch(e){
            console.log("Something went wrong ", e);
        }
        reactNavigator('/');
        }
        else
        reactNavigator(`/report/${roomId}`,{state:{userName,}})
    }

    if(!location.state) {
        return <Navigate to='/'/>
    }

    return <div className="mainWrap">
        <div className="aside">
            <div className="asideInner">
                <div className="logo">
                    <img className="logoImage" src="logo.jpeg" alt="skillDrill logo"/>
                </div>
                <h3>Connected</h3>
                <div className="clientsList">
                <AudioVideo 
                    socketRef={socketRef} 
                    stream={stream} 
                    setStream={setStream} 
                    peers={peers} 
                    neutral={neutral} 
                    angry={angry} 
                    sad={sad} 
                    surprised={surprised} 
                    happy={happy} 
                    disgusted={disgusted}
                    fearful={fearful} />
                </div>
            </div>
            <button className="butn copyBtn" onClick={copyRoomId}>Copy Room Id</button>
            <button className="butn leaveBtn" onClick={leaveRoom}>Leave</button>
        </div>
        
        <div className="editorWrap">
            <button onClick={()=>setPrevState("CodeEditor")}
                className={prevState=='CodeEditor'?"buttonActive":""}>
                Code Editor
            </button>
            <button onClick={()=>setPrevState("WhiteBoard")}
                className={prevState=='WhiteBoard'?"buttonActive":""}>
                WhiteBoard
            </button>
            <span style={{float:"right"}}>&#9742; {isInterviewee?"Interviewee":"Interviewer"}</span>
            <CodeEditor 
                socketRef={socketRef} 
                roomId={roomId}  
                onCodeChange={(code) => {codeRef.current = code;}}
                prevState={prevState}
            />
            <WhiteBoard 
                socketRef={socketRef} 
                canvasRef={canvasRef} 
                roomId={roomId}
                prevState={prevState}
            />
            
            {/* <AudioVideo socketRef={socketRef} stream={stream} setStream={setStream} peers={peers}/> */}
        </div>
    </div>
};

export default Editor;