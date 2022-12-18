import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";

export const VideoPlayer=({stream, val})=>{
    const videoRef = useRef(null);
    const canvasVideoRef = useRef();
    useEffect(()=>{
        if(videoRef.current) videoRef.current.srcObject=stream;
        videoRef && loadModels();
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
}, 10)
}
    console.log("*****************************");
    console.log(stream); 
    return (
    <div>
        
    <video className={val} ref={videoRef} autoPlay width="150" height="150" z-index="-1"/>
    <canvas ref={canvasVideoRef} 
     			className='app__canvas' />
    </div>
    );
}