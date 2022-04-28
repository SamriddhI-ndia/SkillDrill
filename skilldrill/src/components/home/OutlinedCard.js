import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './caro.css';

const OutlinedCard = (props) => {
  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );
  const imgpath='1.png';
  const card = (
    <React.Fragment>
      <CardContent style={{"background":"linear-gradient(#1493d3,#3d5a80,#293241)"}}>
        <div className='unique-img' style={{"background":"1.png"}}><img src="1.png" style={{"width":"100px","height":"80px","margin":"20px 20px"}}/></div>
        {/* <img className='unique-img' src={imgpath} /> */}
        <Typography variant="body1" style={{"fontWeight":"bolder","color":"white","margin":"20px 20px"}}>
          {props.cap}
          <br />
         
        </Typography>
      </CardContent>
      
    </React.Fragment>
  );
  return ( 
<Box sx={{ minWidth: 75 ,maxWidth: 275}} className="card-outlined">
      <Card variant="outlined">{card}</Card>
    </Box>
   );
}
 
export default OutlinedCard;
// export default function OutlinedCard(props) {
//   //imgpath=props.imgpath;
//   return (
    
//   );
// }