import { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export const VideoPlayer=({stream, val, neutral, angry, sad, happy, fearful, disgusted, surprised})=>{
    const videoRef = useRef(null);
    const canvasVideoRef = useRef();
//    neutral.current=0;
//     angry.current=0;
//     sad.current=0;
//     happy.current=0;
//     fearful.current=0;
//     disgusted.current=0;
//     surprised.current=0;
    
    useEffect(()=>{
        if(videoRef.current) videoRef.current.srcObject=stream;
        videoRef && loadModels();
        console.log(neutral)
    },[stream]);
    const loadModels = () => {
     Promise.all([
         faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
         faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
         faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
         faceapi.nets.faceExpressionNet.loadFromUri('/models'),
     ]).then(() => {
         faceDetection();
        })
};
  const faceDetection = async () => {
    setInterval(async() => {
      const detections = await faceapi.detectAllFaces
           (videoRef.current, new faceapi.TinyFaceDetectorOptions())
           .withFaceLandmarks().withFaceExpressions();
		   canvasVideoRef.current.innerHtml = faceapi.
     createCanvasFromMedia(videoRef.current);
        if(detections) {
            //console.log(detections.length, " ------ >>>>>" ,detections[0].expressions)
     if(detections.length>0){
        const expressionArray = await detections[0].expressions;
        neutral.current = await neutral.current + expressionArray.neutral
        disgusted.current = await disgusted.current + expressionArray.disgusted
        fearful.current = await fearful.current + expressionArray.fearful
        happy.current = await happy.current + expressionArray.happy
        sad.current = await sad.current + expressionArray.sad
        surprised.current = await surprised.current + expressionArray.surprised
        angry.current = await angry.current + expressionArray.angry
     }
        }

    //     console.log(parseFloat(angry.current).toFixed(2), 
    //                 parseFloat(disgusted.current).toFixed(2), 
    //                 parseFloat(fearful.current).toFixed(2), 
    //                 parseFloat(happy.current).toFixed(2), 
    //                 parseFloat(neutral.current).toFixed(2), 
    //                 parseFloat(sad.current).toFixed(2), 
    //                 parseFloat(surprised.current).toFixed(2))
    //  }

faceapi.matchDimensions(canvasVideoRef.current, {
    width: 150,
    height: 150,
})
const resized = faceapi.resizeResults(detections, {
    width: 150,
    height: 150,
});

// to draw the detection onto the detected face i.e the box
// faceapi  .draw.drawDetections(canvasVideoRef.current, resized);

//to draw the the points onto the detected face
// faceapi.draw.drawFaceLandmarks(canvasVideoRef.current, resized);

//to analyze and output the current expression by the detected face
faceapi.draw.drawFaceExpressions(canvasVideoRef.current, resized);
}, 4000)
}
    return (
    <div>
        
    <video className={val} ref={videoRef} autoPlay width="150" height="150" z-index="-1"/>
    <canvas ref={canvasVideoRef} 
     			className='app__canvas' />
    </div>
    );
}