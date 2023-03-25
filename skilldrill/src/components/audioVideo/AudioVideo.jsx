import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js";
import {VideoPlayer} from './VideoPlayer'
let i=0;
const AudioVideo = ({ socketRef, stream, setStream, peers, neutral, angry, sad, happy, fearful, disgusted, surprised}) => {
    const videoRef = useRef();
    const canvasVideoRef = useRef();
    useEffect(() => {
    startVideo();
}, [socketRef.current]);
  const startVideo = () => {
     navigator.mediaDevices.getUserMedia({ video: true })
     .then((currentStream) => {
          setStream(currentStream);
          console.log(neutral.current);
      }).catch((err) => {
         console.error(err)
         });
}
    return ( 
        <div className="container">
			<div className="video-container">  
				<div className="video" >
                <VideoPlayer stream={stream} socketRef={socketRef} val="x"
                neutral={neutral} 
                angry={angry} 
                sad={sad} 
                surprised={surprised} 
                happy={happy} 
                disgusted={disgusted}
                fearful={fearful}
                ></VideoPlayer>
                    {Object.values(peers).map((peer)=>{  
                        return <VideoPlayer 
                                    stream={peer.stream} 
                                    socketRef={socketRef} 
                                    neutral={neutral} 
                                    angry={angry} 
                                    sad={sad} 
                                    surprised={surprised} 
                                    happy={happy} 
                                    disgusted={disgusted}
                                    fearful={fearful}
                                />
                    })}
     			</div>
			</div>
        </div>
     );
}
export default AudioVideo;

// add attributes to room table with client id then fetch get request at feedback form and report page.