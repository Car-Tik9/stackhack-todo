import { Box, Typography } from "@material-ui/core";
import ArrowForward from "@material-ui/icons/ArrowForward";
import { makeStyles } from "@material-ui/styles";
import React, { Fragment } from "react";
import Converted from "../../../images/converted_image.png";
import PlainImage from "../../../images/todo_image_tobeconverted.png";

const useStyles = makeStyles((theme) => ({
  imageConatiner: {
    height: 100,
    width: 400,
    borderRadius: 8,
    borderColor: "black",
    borderWidth: 2,
    padding: 8,
    borderStyle: "groove",
  },
  image: {
    height: "100%",
    width: "100%",
  },
  headerTitle:{
      marginBottom:16
  }
}));
const UsageDisplay = () => {
  const classes = useStyles();
  return (
    <Fragment>
    <Typography color="secondary" align="center" className={classes.headerTitle} variant="h5">Tadaaa...!! Upload your Images and convert them into todos</Typography>
    <Box display="flex" justifyContent="space-around" alignItems="center">
      <div className={classes.imageConatiner}>
        <img
          alt="image_screenshot"
          src={PlainImage}
          className={classes.image}
        />
      </div>
      <ArrowForward color="primary" />
      <div className={classes.imageConatiner}>
        <img alt="converted_image" src={Converted} className={classes.image} />
      </div>
    </Box>
    </Fragment>
  );
};

export default UsageDisplay;
