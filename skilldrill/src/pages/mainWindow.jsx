import React, { useEffect } from "react";
import toast from 'react-hot-toast';
import { useState,useRef } from "react";
import { initSocket } from "../socket";
import Client from '../components/mainWindow/Client';
import CodeEditor from "../components/mainWindow/CodeEditor";
import ACTIONS from "../components/mainWindow/Actions";
import { useLocation,useNavigate,Navigate,useParams } from "react-router-dom";
import WhiteBoard from "../components/Board/WhiteBoard";

const Editor=()=>{ 
    const socketRef = useRef(null); //component don't re-render after any change in state of useRef. 
    const location = useLocation();
    const codeRef = useRef(null);
    const reactNavigator = useNavigate();
    const {roomId} =useParams();
    const [clients,setClients]=useState([]);
    const canvasRef = useRef(null);
    const [prevState, setPrevState] = useState('CodeEditor');
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

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            //Listening for joined event
            socketRef.current.on(ACTIONS.JOINED, ({clients, username, socketId})=>{
                if(username!== location.state?.username) {
                    toast.success(`${username} joined the room`);
                    console.log(`${username} joined`);
                }
                setClients(clients);
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
            socketRef.current.on(ACTIONS.DISCONNECTED, ({socketId, username})=>{
                toast.success(`${username} left the room`);
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
    
    const avatar= clients.map((client)=>(<Client username={client.username} key={client.socketId}/>)
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

    function leaveRoom() {
        reactNavigator('/');
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
                    {avatar}
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
        </div>
    </div>
};

export default Editor;