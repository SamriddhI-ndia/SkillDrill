import React, {useEffect, useState} from  "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "@material-ui/core/Input";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import toast from 'react-hot-toast';
import axios from "axios";
import '../../Room.css'

function Login({isLogged,setIsLogged, userName, setUserName}) {
    const history=useNavigate();
    const [email, setEmail]=useState('');
    const [values, setValues] = React.useState({
        password: "",
        showPassword: false,
      });
    let exist=false;
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
            await axios.post("http://localhost:5000/login", {
                email,password
            })
            .then(res=>{
                if(res.data=="exist")
                {
                    
                    toast.success("Successfully LoggedIn!")
                    exist=true;
                    // history("/")
                }
                else if(res.data=="notExist") {
                    toast.error("User have not signUp")
                    history("/signup")
                }
                else if(res.data=="incorrect password")
                {
                    toast.error("Incorrect password :(")
                }
            })
            .catch(e=> {
                toast.error("Something went wrong.")
                console.log(e);
            })
            if(exist)
            {
                await axios.get("http://localhost:5000/login")
                    .then(res=>{
                        const data=res.data;
                        console.log(data)
                        for(let i=0;i<data.length;i++){
                            if(data[i].email==email)
                            {
                                console.log(data[i].email, data[i].username)
                                setUserName(data[i].username);
                                setIsLogged(!isLogged)
                                history("/")
                            }
                        }
                        
                    })
                    .catch(e=>{
                        console.log(e);
                    })
            }
            
         }
         catch(e) {
            console.log(e);
        }
    }
    return (
        <div className="homePageWrapper">
            <div className="formWrapper">
            <h4 className="mainLabel">LOGIN</h4>
            <form action="POST" className="inputGroup">
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
                <div>Doesn't have any account</div>
                <Link to="/signup" className="createNewBtn">SignUp</Link></center>
            </form>
            </div>
        </div>
            
    )
}
export default Login;