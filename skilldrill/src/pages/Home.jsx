import '../App.css';
import { Container } from '@mui/material';
import CustomizedTimeline from '../components/home/CustomizedTimeline';
import OutlinedCard from '../components/home/OutlinedCard';
import Footer from '../components/Footer';
import Caro from '../components/home/Caro';
const Home = () => {
    return ( 
        <div className="App">
        <Container style={{"margin":"0px","padding":"0px"}}>
        <h1 style={{"fontWeight":"bolder","fontSize":"6rem","position":"absolute","top":"40vmin","left":"7vmax","zIndex":"3","color":"white"}}>SkillDrill</h1>
        <h4 style={{"fontWeight":"bolder","fontSize":"2rem","position":"absolute","top":"57vmin","left":"7vmax","zIndex":"3","color":"#3d5a80"}}>A online Interview-Tool And Code Editor</h4>
            <div style={{"zIndex":"1"}}>
          <Caro/>
         
          </div>
          <center>
          <h1 className="headin">What makes us <span className='blue'>unique!</span></h1>
          </center>
          <div className="cont">
            
            
          <OutlinedCard className="card-outlined" des="an online code editor
 that lets people collaborate in real-time" imgpath="bg.png" cap="Collaborative code editor"/>
          <OutlinedCard className="card-outlined" des="" imgpath="bg.png" cap="Ml-Based Evaluation"/>
          <OutlinedCard className="card-outlined" des="Each practice peer is picked especially for you, based on availability, experience, education, practice topics, and target companies." imgpath="bg.png" cap="Peer Mock Interview"/>
          <br/>
          <OutlinedCard className="card-outlined" des="To improve collaborative processes when
 working remotely User can work on a shared board and visualize everything they do in real-time" imgpath="" cap="Whiteboard"/>
          <OutlinedCard className="card-outlined" des="The test environment is in full-screen and is designed to prevent candidates from switching the tab. Every tab switch triggers a warning" imgpath="" cap="No Switching of tab"/>
          <OutlinedCard className="card-outlined" des="" imgpath="" cap="Past Reports based on Performance"/>
          </div>
          <div style={{"marginTop":"140px","marginBottom":"50px"}}>
          <center>
          <h1 className="headin">How you <span className='blue'>GO!</span></h1>
          </center>
          <CustomizedTimeline/>
          </div>
        </Container>
        <Footer/>
      </div>
     );
}
 
export default Home;