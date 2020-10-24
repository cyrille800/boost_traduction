/*eslint-disable*/
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {props.connect && 
        <CustomDropdown
        noLiPadding
        buttonText="Menu"
        buttonProps={{
          className: classes.navLink,
          color: "transparent"
        }}
        buttonIcon={Apps}
        dropdownList={[<Button
              color="transparent"
              className={classes.navLink}
            style={{color: "#0077b6"}}
            href="#sentences"
            >
                Add sentences
            </Button>
            ,
          <a
            className={classes.dropdownLink}
            onClick={()=> {
              props.setConnect(false)
            }}
          > Log out
          </a>
        ]}
      />
      }
        
      </ListItem>
      {!props.connect && 
            <ListItem className={classes.listItem}>
            <Button
              href="https://www.creative-tim.com/product/material-kit-react?ref=mkr-navbar"
              color="transparent"
              className={classes.navLink}
            style={{color: "#0077b6"}}
            href="#Connexion"
            >
              <i className="material-icons">login</i>  Sign in
            </Button>
          </ListItem>
          }
      <ListItem className={classes.listItem}>
        <Tooltip
          id="instagram-facebook"
          title="Follow us on facebook"
          placement={window.innerWidth > 959 ? "top" : "left"}
          classes={{ tooltip: classes.tooltip }}
        >
          <Button
            color="transparent"
            href="https://www.facebook.com/cyrille800"
            target="_blank"
            className={classes.navLink}
          >
            <i className={classes.socialIcons + " fab fa-facebook"} />
          </Button>
        </Tooltip>
      </ListItem>
    </List>
  );
}
