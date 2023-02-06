import React, {useEffect, useState} from  "react";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import toast from 'react-hot-toast';
import axios from "axios";
import '../../Room.css'

function Signup() {
    const history=useNavigate();
    const [email, setEmail]=useState('');
    const [username, setUsername]=useState('')
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
      };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const handlePasswordChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    async function submit(e){
        e.preventDefault();
        const password=values.password;
         try {
            await axios.post("http://localhost:5000/signup", {
                email,password,username
            })
            .then(res=>{
                if(res.data=="Already exist")
                {
                    toast.warning("User have already registered.")
                    history("/login");
                    
                }
                else if(res.data=="username exist")
                {
                    toast.error("UserName is not available, please type new username")
                }
                else if(res.data=="notExist") {
                    toast.success("Successfully Registered!")
                    history("/login")
                }
            })
            .catch(e=> {
                toast.error("Something went wrong.")
                console.log(e);
            })
         }
         catch {
            console.log(e);
         }
    }


    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
            <h4 className="mainLabel">SignUp</h4>
            <form action="POST" className="inputGroup">
                <Input type="text"  onChange={(e)=>{setUsername(e.target.value)}} placeholder="USERNAME" className="inputBox"/>
                <Input type="email" onChange={(e)=>{setEmail(e.target.value)}} placeholder="EMAIL ADDRESS" className="inputBox"/>
                <Input placeholder="PASSWORD" type={values.showPassword ? "text" : "password"} 
                    onChange={handlePasswordChange("password")}
                    value={values.password}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                            {values.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                    </InputAdornment>}
                    className="inputBox"
                />
                
                <center><button className="butn joinBtn" onClick={submit}>SUBMIT</button>
                <div>OR</div>   
                <div>Already have an account</div>
                <Link to="/login" className="createNewBtn">Login</Link></center>
            </form>

            
                
            
            
            </div>
        </div>
            
    )
}
export default Signup;