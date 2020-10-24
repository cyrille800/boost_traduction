import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "components/CustomButtons/Button.js";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import image from '../../../assets/img/mobile-message.svg';

import Box from '@material-ui/core/Box';
import { FormControl, InputLabel, OutlinedInput } from "@material-ui/core";

import TextField from '@material-ui/core/TextField';
import Axios from 'axios'

const useStyles = makeStyles(styles);


const useStyless = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

var md5 = require('md5');

export default function SectionInscription({connexion, idUser}) {



const [name,SetName] = useState("")
const [mail,SetMail] = useState("")
const [password,SetPassword] = useState("")
const [continu,setContinu] = useState(false);
const [nbrAleatoire,setNbrAleatoire] = useState(0)
const [Errormail,setErrorMail] = useState(false);
const [mailExist,setMailExist] = useState(false);
const [codeConfirmation,setCodeConfirmation] = useState(true);

  const classes = useStyles();

  const classess = useStyless();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    let nb=Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
    setNbrAleatoire(nb)
    alert(nb)
    //sendEmail(nb);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var mailformat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(mail.trim()!==""){
    if(mail.match(mailformat))
    {
      if(Errormail){
        setErrorMail(false)
      }
    }else{
      if(!Errormail){
        setErrorMail(true)
      }   
    }
  }

  if(name.trim()!=="" && mail.trim()!=="" && password.trim()!=="" && Errormail===false && mailExist===false) {
    if(continu !== true){      
      setContinu(true);
    }
  }else{
    if(continu !== false){
      setContinu(false)
    }
  }

  const addDatabase = (n,m,p) => {
    Axios.post("http://localhost:3001/addUser",{name:n,mail: m, password: md5(p)}).then((response)=>{
      SetName("")
      SetPassword("")
      SetMail("")
      idUser(parseInt(response.data.insertId))
    })   
  }

  const checkMail = (p) => {

    if(!Errormail) {
      Axios.post("http://localhost:3001/chechMail",{mail: p}).then((response)=>{
        setMailExist((parseInt(response.data[0].nbr)===0) ? false : true )
      })
    }
  
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
<FormControl fullWidth className={classes.margin} variant="outlined"  style={{
  marginBottom: "8%",
  marginTop: "8%"
}}>
          <InputLabel htmlFor="outlined-adornment-amount">Your name</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={name}
            onChange={(e)=>SetName(e.target.value)}
            startAdornment={<InputAdornment position="start"><i className="material-icons">person</i></InputAdornment>}
            labelWidth={80}
            autoComplete="nope"
          />
        </FormControl>

        <FormControl fullWidth className={classes.margin} variant="outlined" style={{
  marginBottom: "8%"
}}>
          <InputLabel htmlFor="outlined-adornment-amount">Your email</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={mail}
            onChange={(e)=>{SetMail(e.target.value);checkMail(e.target.value)}}
            startAdornment={<InputAdornment position="start" ><i className="material-icons">email</i></InputAdornment>}
            labelWidth={80}
            autoComplete="nope"
          />
          <span style={{color:"#e63946"}}>{Errormail && "mail is incorrect"}</span> 
          <span style={{color:"#e63946"}}>{mailExist && "mail is already exist"}</span>
        </FormControl>

        <FormControl fullWidth className={classes.margin} variant="outlined"  style={{
  marginBottom: "8%"
}}>
          <InputLabel htmlFor="outlined-adornment-amount">Your password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={password}
            type='password'
            onChange={(e)=>SetPassword(e.target.value)}
            startAdornment={<InputAdornment position="start"><i className="material-icons">vpn_key</i></InputAdornment>}
            labelWidth={110}
            autoComplete="nope"
          />
        </FormControl>

        <Button  variant="contained" color="facebook" style={{width: "100%"}} 
        onClick={handleOpen}  disabled={!continu} >
  Create
</Button>
</form>

        
        </center>
        

      </Box>


{// code de verification
}

<Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classess.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classess.paper}>
            <h2 id="transition-modal-title">Enter the CODE</h2>
            <p id="transition-modal-description">send to <span style={{ color: "#0077b6"}}>{mail}</span> </p>
            <form action="" autoComplete="off">
            <TextField id="standard-basic" label="" style={{ height:"10px" }} onChange={(e)=>{
              if(e.target.value===nbrAleatoire) {
                addDatabase(name,mail,password);
                handleClose()
                setCodeConfirmation(true)
                connexion(true)
              }else{
                setCodeConfirmation(false)
              }
            }}/>
            <span style={{color:"#e63946"}}>{!codeConfirmation && "code is incorrect"}</span> 
            </form>
          </div>
        </Fade>
      </Modal>

    </div>
  );
}
