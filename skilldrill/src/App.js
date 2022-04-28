//import Navbar from './components/Navbar';
import './App.css';
import { Container } from '@mui/material';
import CustomizedTimeline from './components/home/CustomizedTimeline';
import Home from './pages/Home';
import OutlinedCard from './components/home/OutlinedCard';
import Footer from './components/Footer';
import Caro from './components/home/Caro';
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom';
function App() {
  return (
    
    <>
    <Router>
    <div className="App">
     <center>
        <Navbar/>
        </center>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        
      </Switch>
    </div>
    </Router>
    </>
  );
}

export default App;
