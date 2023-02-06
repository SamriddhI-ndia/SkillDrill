import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Room from './pages/Room'
import Editor from './pages/mainWindow';
import Report from './components/report/Report';
import { Toaster } from 'react-hot-toast';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Login from './components/login/Login';
import Signup from './components/signUp/SignUp';
import React, {useEffect, useState} from  "react";
import ReportCard from './components/reportCard/ReportCard'
function App() {
  const [isLogged,setIsLogged]= useState(false);
  const [userName, setUserName]=useState("");
  const [isInterviewee, setIsInterviewee] = useState(true);
  
  return (
    
    <>
    <div>
      <Toaster position="top-right" toastOptions={
        {
          success:{
            theme:{
              primary:"#4aed88"
            },
          }
        }
      }>
       
      </Toaster>
    </div>
    <BrowserRouter>
    <div className="App">
     <center>
        <Navbar isLogged={isLogged} setIsLogged={setIsLogged}  userName={userName} setUserName={setUserName}/>
        </center>
      <Routes>
        <Route exact path="/" element={ <Home/>}>
         
        </Route>
        <Route exact path='/room' element={<Room userName={userName} isInterviewee={isInterviewee} setIsInterviewee={setIsInterviewee}/>}>
          
        </Route >
        <Route exact path='/editor/:roomId' element={<Editor isInterviewee={isInterviewee} userName={userName} />}>
          
        </Route>
        <Route exact path='/report/:roomId' element={<Report/>}>

        </Route>
        <Route exact path='/login' element={<Login isLogged={isLogged} setIsLogged={setIsLogged} userName={userName} setUserName={setUserName}/>}>
        </Route>
        <Route exact path='/signup' element={<Signup/>}></Route>
        <Route exact path='/reportCard/:username' element={<ReportCard/>}> </Route>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;