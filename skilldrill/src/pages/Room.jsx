import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import '../Room.css'
const Room = ({userName, isInterviewee, setIsInterviewee}) => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    // const [username, setUsername] = useState('');
    

    const handleChange = val => {
        setIsInterviewee(val)
    }
    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('Created a new room');
    };

    const joinRoom = () => {
        if (!roomId || !userName) {
            toast.error('ROOM ID & username is required');
            return;
        }

        // Redirect
        navigate(`/editor/${roomId}`, {
            state: {
                userName,
            },
        });
        console.log("done !");
    };

    const handleInputEnter = (e) => {
        if (e.code === 'Enter') {
            joinRoom();
        }
    };
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
                
                <h4 className="mainLabel">Paste invitation ROOM ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder="ROOM ID"
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyUp={handleInputEnter}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        value={userName}
                        onKeyUp={handleInputEnter}
                        disabled
                    />
                    <div>
                    <Switch
                        checked={isInterviewee}
                        onChange={handleChange}
                        onColor="#4aed88"
                        onHandleColor="#FFFFFF"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                        height={20}
                        width={48}
                        className="react-switch toggle"
                        id="material-switch"
                    />
                    <span className="textToggle">{isInterviewee?"Interviewee":"Interviewer"}</span>
                    <button className="butn joinBtn alignRight" onClick={joinRoom}>
                        Join
                    </button>
                    </div>
                    <span className="createInfo">
                        If you don't have an invite then create &nbsp;
                        <a
                            onClick={createNewRoom}
                            href=""
                            className="createNewBtn"
                        >
                            new room
                        </a>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Room;