import './App.css';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Room from './pages/Room'
import Editor from './pages/mainWindow';
import Report from './components/report/Report';
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
        <Route exact path='/room' element={<Room/>}>
          
        </Route >
        <Route path='/editor/:roomId' element={<Editor/>}>
          
        </Route>
        <Route path='/report' element={<Report/>}>

        </Route>
      </Routes>
    </div>
    </BrowserRouter>
    </>
  );
}

export default App;