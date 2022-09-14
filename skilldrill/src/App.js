//import Navbar from './components/Navbar';
import './App.css';
import { Container } from '@mui/material';
import CustomizedTimeline from './components/home/CustomizedTimeline';
import Home from './pages/Home';
import OutlinedCard from './components/home/OutlinedCard';
import Footer from './components/Footer';
import Caro from './components/home/Caro';
import Navbar from './components/Navbar';
import CodeEditor from './components/CodeEditor'
import Editor from './components/Editor';
import { Toaster } from 'react-hot-toast';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
function App() {
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
        <Navbar/>
        </center>
      <Routes>
        <Route exact path="/" element={ <Home/>}>
         
        </Route>
        <Route exact path='/room' element={<CodeEditor/>}>
          
        </Route >
        <Route path='/editor/:roomId' element={<Editor/>}>
          
        </Route>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;
