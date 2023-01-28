import React, { useRef, useState, useEffect } from "react";
import ACTIONS from "../mainWindow/Actions";
import "./canvas.css";


function WhiteBoard({socketRef, canvasRef, roomId, prevState}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [size, setSize] = useState("3");
  const [erase, setErase] = useState(false);
  const ctx = useRef(null);
  const timeout = useRef(null);
  const [cursor, setCursor] = useState("default");

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    canvas.height = window.innerHeight-130;
    canvas.width = window.innerWidth;

  }, [ctx]);

  const startPosition = ({ nativeEvent }) => {
    setIsDrawing(true);
    draw(nativeEvent);
  };

  const finishedPosition = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineCap = "round";
    if (erase) {
    ctx.current.strokeStyle = "#282A36";
    ctx.current.lineWidth = 40;
    } else{
    ctx.current.strokeStyle = color;
    ctx.current.lineWidth = size;
    }

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var canvasImage = canvas.toDataURL("image/png");
      socketRef.current.emit(ACTIONS.WHITEBOARD_CHANGE,{roomId, canvasImage})
    }, 400);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#282A36";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if (timeout.current !== undefined) clearTimeout(timeout.current);
    timeout.current = setTimeout(function () {
      var canvasImage = canvas.toDataURL("image/png");
      socketRef.current.emit(ACTIONS.WHITEBOARD_CHANGE,{roomId, canvasImage})
    }, 400);
  };

  const getPen = () => {
    setErase(false);
    setCursor("default");
    setSize("3");
    setColor("#3B3B3B");
  };

  const eraseCanvas = () => {
    setCursor("grab");
    setSize("20");
    setColor("#282A36");

    if (!isDrawing) {
      return;
    }
  };
  useEffect(()=>{
    if(socketRef.current) {
      console.log("socket k ander aggya");
        socketRef.current.on(ACTIONS.WHITEBOARD_CHANGE, ({canvasImage})=>{
          console.log("Action listened successfully");
            if(canvasImage!=null) {
              console.log("Canvas image is not noll");
                var image = new Image();
                ctx.current = canvasRef.current.getContext("2d");
                image.onload = function () {
                  ctx.current.drawImage(image, 0, 0);
                  setIsDrawing(false);
                };
                image.src = canvasImage;
              
            }
        });
    }
   
},[socketRef.current])

  return (
    <div className={prevState=="CodeEditor"? "whiteboardNotVisible":"whiteboardVisible"}>
      <div className="canvas-btn">
      <button onClick={getPen} className="btn-width whiteboardButton">
          Pencil
        </button>
        <div className="btn-width ">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>
        <div>
          <select
            className="btn-width whiteboardButton"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <button onClick={clearCanvas} className="btn-width whiteboardButton">
          Clear
        </button>
        <div>
          <button onClick={()=>setErase(true)} className="btn-width whiteboardButton">
            Eraser
          </button>
        </div>
      </div>
      <canvas
       style={{ cursor: cursor }}
        onMouseDown={startPosition}
        onMouseUp={finishedPosition}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </div>
  );
}
export default WhiteBoard;