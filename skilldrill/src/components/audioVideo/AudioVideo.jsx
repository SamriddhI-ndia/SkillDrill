import React, { useEffect, useRef, useState } from "react"
import * as faceapi from "face-api.js";
let i=0;
const AudioVideo = ({ socketRef, stream, setStream}) => {
    const videoRef = useRef();
  const canvasVideoRef = useRef();
  
  useEffect(() => {
    startVideo();
    videoRef && loadModels();
}, [socketRef.current]);
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
  const startVideo = () => {
     navigator.mediaDevices.getUserMedia({ video: true })
     .then((currentStream) => {
          videoRef.current.srcObject = currentStream;
          setStream(currentStream);
      }).catch((err) => {
         console.error(err)
         });
}
  const faceDetection = async () => {
    setInterval(async() => {
      const detections = await faceapi.detectAllFaces
           (videoRef.current, new faceapi.TinyFaceDetectorOptions())
           .withFaceLandmarks().withFaceExpressions();
		   canvasVideoRef.current.innerHtml = faceapi.
     createCanvasFromMedia(videoRef.current);
faceapi.matchDimensions(canvasVideoRef.current, {
    width: 940,
    height: 650,
})
const resized = faceapi.resizeResults(detections, {
    width: 940,
    height: 650,
});

// to draw the detection onto the detected face i.e the box
faceapi.draw.drawDetections(canvasVideoRef.current, resized);

//to draw the the points onto the detected face
faceapi.draw.drawFaceLandmarks(canvasVideoRef.current, resized);

//to analyze and output the current expression by the detected face
faceapi.draw.drawFaceExpressions(canvasVideoRef.current, resized);
}, 1000)
}
    return ( 
        <div className="container">
			<div className="video-container">
                {/* {
                    console.log(clients.length)
                }
                {   
                    clients.map(cl=>{
                    console.log(cl); 
                    i=i+1;   
                    return <div className="video" key={i}>
					{stream &&  <video muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
				</div>})
                } */}
				<div className="video" >
					<video crossOrigin='anonymous' ref={videoRef} autoPlay muted width="940" height="650"/>
     			</div>
     			{/* <canvas ref={canvasVideoRef} width="940" height="650"
     			className='app__canvas' /> */}
			</div>
        </div>
     );
}
 
export default AudioVideo;