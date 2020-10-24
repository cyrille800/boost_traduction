import React from "react";
// react component for creating beautiful carousel
import Carousel from "react-slick";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";

import image1 from "assets/img/bg.jpg";
import image2 from "assets/img/bg2.jpg";
import image3 from "assets/img/bg3.jpg";
import Testimony from "../Testimony/Testimony"

import styles from "assets/jss/material-kit-react/views/componentsSections/carouselStyle.js";

const useStyles = makeStyles(styles);

export default function SectionCarousel() {
  const classes = useStyles();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  return (
    <div className={classes.section}>
      
      <div className={classes.container}>
      <center>
      <h1 className="font-normal text-44 mt-0 text-white mx-auto mb-16" style={{
        color: "white"
      }}>What our customers say</h1>
      </center>
        <GridContainer>
          
          <GridItem xs={12} sm={12} md={8} className={classes.marginAuto}>
            <Card carousel>
              <Carousel {...settings}>
              <Testimony image={image1} msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore blanditiis delectus odit doloremque minima, quibusdam quas fugiat atque tenetur, commodi quo nesciunt iste ipsam, doloribus enim. Voluptas odio cum provident." />
              <Testimony image={image2} msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore blanditiis delectus odit doloremque minima, quibusdam quas fugiat atque tenetur, commodi quo nesciunt iste ipsam, doloribus enim. Voluptas odio cum provident." />
              <Testimony image={image3} msg="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore blanditiis delectus odit doloremque minima, quibusdam quas fugiat atque tenetur, commodi quo nesciunt iste ipsam, doloribus enim. Voluptas odio cum provident." />
              </Carousel>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
}
