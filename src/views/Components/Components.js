import React, {useState, useEffect} from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Parallax from "components/Parallax/Parallax.js";
// sections for this page
import HeaderLinks from "components/Header/HeaderLinks.js";
import SectionCarousel from "./Sections/SectionCarousel.js";
import SectionLogin from "./Sections/SectionLogin.js";

import styles from "assets/jss/material-kit-react/views/components.js";
import ScrollableAnchor from 'react-scrollable-anchor'

import image1 from '../../assets/img/ecrire.PNG';
import image2 from '../../assets/img/challenge.PNG';
import image3 from '../../assets/img/suivis.PNG';
import user from '../../assets/img/user.PNG';
import Axios from 'axios'


import SectionInscription from "./Sections/SectionInscription.js";
import SectionAddSentences from "./Sections/SectionAddSentences.js";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import $ from 'jquery'
import { TextField } from "@material-ui/core";

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);


const useStyles = makeStyles(styles);

export default function Components(props) {

  const [color1, setColor1] = useState('#023a66')
  const [color2, setColor2] = useState('#25177c')

  const [compte, setCompte] = useState(true) ;
  const [isConnec, setIsConnect] = useState(false);
  const [idUser, setIdUer] = useState(-1) ;

  const [choiceEnglishVersion, setchoiceEnglishVersion] = useState("")
  const [choiceFrenchVersion, setchoiceFrenchVersion] = useState("")
  const [choiceIdUser, setchoiceIdUser] = useState(-1)
  const [choiceIdChoise, setchoiceIdChoise] = useState(-1)
  const [isDifficle, setisDifficile] = useState(false)
  const [showreponse,setshowreponse] = useState(false);
  const [reponseUser,setreponseuser] = useState("");
  const [correctReponse,setcorrectreponse] = useState(false);


  const deleteSentes = () =>{
    Axios.post("http://localhost:3001/deleteSentence",{idPhrase: choiceIdChoise}).then((response)=>{
                  if(response.data.reponse){
                    handleClose()
                    $("#generer").trigger("click")
                  }
                })    
  }
  const SupprimerDifficulter = () => {
    Axios.post("http://localhost:3001/deleteDifficile",{idUser: idUser, idPhrase: choiceIdChoise}).then((response)=>{
                  if(response.data.reponse){
                    setisDifficile(false);
                  }
                })
  }

  const AjouterDifficulter = () => {
    Axios.post("http://localhost:3001/addDifficile",{idUser: idUser, idPhrase: choiceIdChoise}).then((response)=>{
                  if(response.data.reponse){
                    setisDifficile(true);
                  }
                })
  }

  const generateWord = async () => {
    let nb=-1;
    let reponse=false;
    do{
      await Axios.post("http://localhost:3001/chooseId",{id: choiceIdChoise}).then(async (response)=>{
        nb =response.data.nb

        await Axios.post("http://localhost:3001/checkId",{id: nb}).then(async (responses)=>{
          if(responses.data.nb!==0){
            await Axios.post("http://localhost:3001/getSentece",{id: nb}).then(async (responsess)=>{
                reponse=true;
                setchoiceEnglishVersion(responsess.data[0].englishVersion)
                setchoiceFrenchVersion(responsess.data[0].frenchVersion)
                setchoiceIdUser(responsess.data[0].idUser)
                setchoiceIdChoise(nb);
                setcorrectreponse(false);
                setreponseuser("")

                Axios.post("http://localhost:3001/checkSentenceDifficile",{idUser: idUser, idPhrase: nb}).then((responsesss)=>{
                  setisDifficile(responsesss.data.reponse)
                })
            })
          }
        })
      })

    }while(reponse===false)
    
  }
  useEffect(() => {
    
    const interval = setInterval(() => {
      var randomColor = require('randomcolor');


        let colo1 = randomColor({
          luminosity: 'dark',
          hue: 'blue'
        })


        let colo2 = randomColor()
        setColor1(colo1)
        setColor2(colo2)
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const classes = useStyles();
  const { ...rest } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div style={{
      background: "linear-gradient(45deg, "+color1+" 0%,"+color2+" 100%)"
    }}>
      <Header
        connect={isConnec}
        brand="Boost vocabulary"
        rightLinks={<HeaderLinks connect={isConnec} setConnect={setIsConnect} />}
        fixed
        color="white"
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax color1={(isConnec) ? '#023a66':color1} color2={(isConnec) ? '#25177c':color2} style={{
        height: (isConnec) ? "100vh" : "90vh"
      }}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem>
              <div className={classes.brand}>
               <center>
               <h2 className="font-normal text-center text-48 mb-4 mt-0">
                 {
                   (choiceIdChoise==-1) ?<span>What're you going on ?</span> : choiceFrenchVersion
                 }
                 </h2>
               <h2 className="font-normal">
                {
                   (choiceIdChoise==-1) ? (isConnec) ? <span></span> : <span>Here is all you can do</span> : (showreponse) ? choiceEnglishVersion: <div style={{
                     
                   }}>
                     <TextField
                   id="outlined-full-width"
                   label=""
                   style={{ background: "white", borberRadius: "7%", opacity: "0.8" }}
                   placeholder="Your translate"
                   fullWidth
                   margin="normal"
                   InputLabelProps={{
                     shrink: true,
                   }}
                   variant="outlined"
                   value={reponseUser}
                   onChange={(e)=> {setreponseuser(e.target.value);
                    if(e.target.value.trim()==choiceEnglishVersion.trim()) {
                      setcorrectreponse(true)
                    }else{
                      setcorrectreponse(false)
                    }
                   }}
                 />
                 { (correctReponse) ? <span style={{
            color: "#168A45" }}>True answer</span> : <span style={{
            color: "#FC334E"
        }}>False answer</span>}
                   </div>
                 }
                  </h2>
               <a href="#dernieres-nouvelles">
                 {(isConnec) ? (choiceIdChoise==-1) ? <div><Button color="success" round onClick={()=>generateWord()}> <i className="material-icons">touch_app</i> generate a sentence
                 </Button></div>: <div><Button color="success" round style={{width:"1%"}} id="generer" onClick={()=>generateWord()}> <i className="material-icons">update</i>
                 </Button><Button color="facebook" round style={{width:"1%",marginLeft:"1%"}} onClick={()=>{
                   setshowreponse(!showreponse)
                 }}> <i className="material-icons">outlet</i>
                 </Button>
                 
                 
                 
                 <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="white"
        onClick={handleClick}
        style={{width: "1%",marginLeft:"1%",color:"black"}}

        round
      >
        <i className="material-icons">{(anchorEl===null) ? "unfold_more" : "unfold_less"}</i>
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{marginTop:"1%"}}
      >
        <StyledMenuItem>
          <ListItemText primary="Options" />
        </StyledMenuItem>
        {
          (choiceIdUser== idUser) ? <div>
                    <StyledMenuItem>
        <i className="material-icons" style={{color: "red"}}>restore_from_trash</i>
          <ListItemText primary="Delete" onClick={()=>{deleteSentes()}}/>
        </StyledMenuItem>
          </div> : <div></div>
        }

        <StyledMenuItem>
        <i className="material-icons" style={{color: "orange"}}>trending_up</i>
          <ListItemText primary={(isDifficle) ? "remove from the list of complicate" : "Add to complicate"} onClick={()=>{
            if(isDifficle){
              SupprimerDifficulter()
            }else{
              AjouterDifficulter()
            }
          }}/>
        </StyledMenuItem>
      </StyledMenu>
      
      </div> : <Button color="facebook" round> <i className="material-icons">touch_app</i> Learn more
                 </Button>}
                 
                 </a>
               </center>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>

     {!isConnec && <div>
       
      <div className={classNames(classes.main)} id="">
      <ScrollableAnchor id={'dernieres-nouvelles'}>
      
        <div className="MuiGrid-container" style={{
          padding: "5%"
        }} >

          <div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-5">
          <center>
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 MuiGrid-justify-xs-space-between">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-7">
              <div className="text-center max-w-252 mx-auto">
              <div className="jss3">
              <img src={image1} alt="Logo" width="30%" />
              </div>
              <h2 >Boost your vocabulary</h2>
              <p className="max-w-400">you would have access to a database used by our whole community to add sentences that will be translated into french, so with each revision you will learn even more.</p>
              </div>
            </div>
         </div>
          </center>
          </div>


          <div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-4">
          <center>
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 MuiGrid-justify-xs-space-between">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-7">
              <div className="text-center max-w-252 mx-auto">
              <div className="jss3">
              <img src={image2} alt="Logo" width="40%" />
              </div>
              <h3>battle between friends <i className="material-icons" style={{
                color: "#ffb703"
              }}>insert_emoticon</i></h3>
              <p className="max-w-400">finally to improve your level in the language, you will participate in challenges at the end of judging your level</p>
              </div>
            </div>
         </div>
          </center>
          </div>

          <div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-3">
          <center>
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 MuiGrid-justify-xs-space-between">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-7">
              <div className="text-center max-w-252 mx-auto">
              <div className="jss3">
              <img src={image3} alt="Logo" width="40%" />
              </div>
              <h3>follow your progress <i className="material-icons" style={{
                color: "#40916c"
              }}>check_circle</i></h3>
              <p className="max-w-400">revise every day with this application in order to master your gaps</p>
              </div>
            </div>
         </div>
          </center>
          </div>
          


        </div>
      
        </ScrollableAnchor>

        </div>
        <SectionCarousel />
        <div className={classNames(classes.main)} id="">
        <ScrollableAnchor id={'Connexion'}>

        <div className="MuiGrid-container" style={{
          padding: "5%"
        }} >
<div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-2">


</div>
<div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-5">
          <center>
          <div className="MuiGrid-root MuiGrid-container MuiGrid-spacing-xs-6 MuiGrid-justify-xs-space-between">
            <div className="MuiGrid-root MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-7">
              <div className="text-center max-w-252 mx-auto">
              <div className="jss3">
              <img src={user} alt="Logo" width="30%" />
              </div>
              <h2 >Why use a profile</h2>
              <h4 ><i className="material-icons" style={{color: "#2a9d8f"}}>done</i> allows to secure the application </h4>
              <h4 ><i className="material-icons" style={{color: "#2a9d8f"}}>done</i> allows you to make challenges between several accounts </h4>
              <h4 ><i className="material-icons" style={{color: "#2a9d8f"}}>done</i> allows to improve the level of each individual </h4>
              <Button variant="Souscribe" color="rose" onClick={()=> {setCompte(!compte)}}>
                {compte && "Suscribe"}
                {!compte && "Sign in"}
            </Button>
                </div>
            </div>
         </div>
          </center>
          </div>


          <div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-3">
            {compte && <SectionLogin connexion={setIsConnect} idUser={setIdUer}/>}
            {!compte && <SectionInscription connexion={setIsConnect} idUser={setIdUer} />}
          </div>

        </div>
        </ScrollableAnchor>
        </div>
        
        <Footer />
        </div>} 

{// ce bloque contient le formulaire pour ajouter les phrases
}
        {isConnec && <ScrollableAnchor id={'sentences'}><div>
          <div className={classNames(classes.main)} id="" style={{
            background: "#f5f5f5"
          }}>
          <SectionAddSentences idUser={idUser}  />
          </div>
          
        </div>
        </ScrollableAnchor>
        }

    </div>
  );
}
