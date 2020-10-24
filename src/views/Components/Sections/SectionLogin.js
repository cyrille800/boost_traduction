import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import image from '../../../assets/img/mobile-message.svg';

import Box from '@material-ui/core/Box';
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";
import Axios from 'axios'

const useStyles = makeStyles(styles);
var md5 = require('md5');

export default function SectionLogin({connexion,idUser}) {
  const classes = useStyles();
  const [continu,setContinu] = useState(false)
  const [mail,SetMail] = useState("")
  const [password,SetPassword] = useState("")
  const [invalidUser,setInvalidUser] = useState(false)

  if(mail.trim()!=="" && password.trim()!=="") {
    if(continu !== true){      
      setContinu(true);
    }
  }else{
    if(continu !== false){
      setContinu(false)
    }
  }

  const checkUser = () => {


      Axios.post("http://localhost:3001/checkUser",{mail: mail, password: md5(password)}).then((response)=>{
        if(parseInt(response.data.id)===-1){
          setInvalidUser(true)
        }
        else{
          connexion(true)
          idUser(response.data.id)
        }
      })
    
  
  }


  return (
    <div>


      <Box
        boxShadow={3}
        bgcolor="white"
        m={1}
        p={1}
        style={{borderRadius: "1%" }}
      >
        
        <center>
        <img src={image} alt=""  width="60%" />

<form action="" style={{
  width: "85%"
}}>

        <FormControl fullWidth className={classes.margin} variant="outlined" style={{
  marginBottom: "8%"
}}>
          <InputLabel htmlFor="outlined-adornment-amount">Your email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={mail}
            onChange={(e)=> {SetMail(e.target.value)}}
            startAdornment={<InputAdornment position="start"><i className="material-icons">email</i></InputAdornment>}
            labelWidth={80}
          />
        </FormControl>

        <FormControl fullWidth className={classes.margin} variant="outlined"  style={{
  marginBottom: "8%"
}}>
          <InputLabel htmlFor="outlined-adornment-amount">Your password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            type="password"
            value={password}
            onChange={(e)=> {SetPassword(e.target.value)}}
            startAdornment={<InputAdornment position="start"><i className="material-icons">vpn_key</i></InputAdornment>}
            labelWidth={110}
          />
        </FormControl>
        <span style={{color:"#e63946"}}>{invalidUser && "user not found"}</span> 
        <Button variant="contained" color="facebook" style={{width: "100%"}} disabled={!continu} onClick={()=>checkUser()}>
  Login
</Button>
</form>

        
        </center>
        

      </Box>



    </div>
  );
}
