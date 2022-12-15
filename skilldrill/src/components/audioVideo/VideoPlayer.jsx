import { useEffect, useRef } from "react";

export const VideoPlayer=({stream, val})=>{
    const videoRef = useRef(null);
    useEffect(()=>{
        if(videoRef.current) videoRef.current.srcObject=stream;
        
    },[stream]);
    //console.log("*****************************");
    //console.log(val); 
    return (
    <div>
        
    <video ref={videoRef} autoPlay/>
    </div>
    );
}