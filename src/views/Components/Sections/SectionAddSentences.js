import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button.js";

import image from '../../../assets/img/anglais.svg';
import france from '../../../assets/img/france.svg';
import search from '../../../assets/img/search.svg';

import Box from '@material-ui/core/Box';
import { TextField, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import SectionIdemSearch from "./sectionIdemSearch.js";
import Axios from 'axios'

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



export default function SectionAddSentences(props) {

  const classess = useStyless();
  const [englishVersion, setEnglishversion] = useState("");
  const [frenchhVersion, setfrenchversion] = useState("");
  const [tailleRecherche, setTaillerecherche] = useState(0);
  const [resultatRecherche, setResultatRecherche] = useState([]);
  const [sentenceExist, setSentenceExist] = useState(false);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const searchText = (text) => {
    if(text.trim()!==""){
      Axios.post("http://localhost:3001/search",{text: text}).then((response)=>{
        console.log(response.data)
        setResultatRecherche(response.data)
        setTaillerecherche(response.data.length)
      })
    }else{
      setTaillerecherche(0)
      setResultatRecherche([])
    }
  }


  const addSentence = () => {
    

    Axios.post("http://localhost:3001/checkSentence",{english: englishVersion}).then((response)=>{
      console.log(response.data)
      if(response.data.nombre==0){
        setSentenceExist(false);
              Axios.post("http://localhost:3001/addSentence",{id:props.idUser,english: englishVersion, french: frenchhVersion}).then((response)=>{
          setEnglishversion("")
          setfrenchversion("")
        })
      }else{
        setSentenceExist(true);
      }
    })


  }


  return (
    <div style={{
        paddig: "5%"
    }}>
<div className="MuiGrid-container" style={{
    padding: "5%",
    paddingLeft: "2%"
}}>
<div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-6" >
          <center>

          <Box
        boxShadow={2}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ padding: "5%",
        height: "38vh" }}
      >
          <TextField
          id="outlined-full-width"
          label="englih version"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={englishVersion}
          onChange={(e)=> {setEnglishversion(e.target.value);
          }}
        />

        <img src={france} alt=""  width="6%" style={{
            marginTop:"-4%"
        }} />

<TextField
          id="outlined-full-width"
          label="french version"
          style={{ margin: 8 }}
          placeholder="Placeholder"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={frenchhVersion}
          onChange={(e)=> {setfrenchversion(e.target.value)}}
        />
                {sentenceExist && <div><span style={{
            color: "#FC334E"
        }}>"Sentences already exists"</span></div>}
      </Box>



          </center>
</div>
<div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-1">
<Button variant="contained" color="facebook" style={{width: "100%"}} onClick={()=>{addSentence()}}>
<i className="material-icons" >touch_app</i> Add
</Button>
<center>
<Button variant="contained" color="dark" style={{width: "20%"}} onClick={()=>{
  searchText(englishVersion)
}}>
<i className="material-icons" >search</i>
</Button>
</center>
          <center>
          <img src={image} alt=""  width="80%" />
          </center>
</div>
<div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-sm-12 MuiGrid-grid-md-5">
          <center>
          <Box
        boxShadow={2}
        bgcolor="background.paper"
        m={1}
        p={1}
        style={{ padding: "5%",
        height: "38vh" }}
      >
          <Typography variant="h6"  gutterBottom>
        Search results
      </Typography>

        <img src={search} alt=""  width="6%"/>

        <h3 class="font-normal">number of results <span style={{
            color: "#1f3c88"
        }}>{tailleRecherche}</span> </h3>

        <h5 class="font-normal">
        <Link href="#" onClick={handleOpen}>
        click here to view <i className="material-icons" >touch_app</i>
        </Link>
        </h5>
      </Box>
          </center>
</div>
</div>

      

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
          <Button variant="contained" color="danger" onClick={handleClose} >
                Cloe
            </Button>
            <h2 id="transition-modal-title">Transition modal</h2>
            <div id="transition-modal-description" style={{
                height: "30vh",
                display: "block",
                overflowY: "scroll"
            }}>
              <ul className="MuiList-root MuiList-dense MuiList-padding">
              {resultatRecherche.map((val)=> {
                return <SectionIdemSearch english={val.englishVersion} french={val.frenchVersion} mot={englishVersion} />
              })}
              </ul>
            </div>
          </div>
        </Fade>
</Modal>



    </div>
  );
}
