import { Avatar } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import React from 'react'

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function Testimony(props) {
  const classes = useStyles();


    const {image,msg} = props;
    return (
        <div>
            <center>
            <div className="slick-image" style={{
                padding: "5%"
              }}>
  
              <div className="MuiGrid-container" >
                <div className="MuiGrid-root jss99  MuiGrid-item MuiGrid-grid-xs-12 MuiGrid-grid-md-3">
                <Avatar alt="Remy Sharp" src={image} className={classes.large} />
                </div>
                <div className="MuiGrid-root jss99  MuiGrid-item  MuiGrid-grid-md-7">
                {msg}
                <br/>
                <i className='material-icons' style={{
                  color: "#ffb703"
                }}>start</i><i className='material-icons' style={{
                  color: "#ffb703"
                }}>start</i><i className='material-icons' style={{
                  color: "#ffb703"
                }}>start</i><i className='material-icons' style={{
                  color: "#ffb703"
                }}>start</i><i className='material-icons' style={{
                  color: "#ffb703"
                }}>start</i>
                <br/>
                <br/>
                </div>
              </div>
              </div>
            </center>
      </div>
    )
}