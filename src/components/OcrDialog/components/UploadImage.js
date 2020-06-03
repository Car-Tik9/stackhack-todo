import { Button, Box } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import BeatLoader from "react-spinners/BeatLoader";
import UsageDisplay from "./UsageDisplay";

var Tesseract = window.Tesseract;
const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  stepContent: {
    padding: theme.spacing(2),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
const UploadImage = (props) => {
  const [processing, setProcessing] = useState(false);
  const handleChangeFile = (event) => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      generateText(uploads);
    } else {
      return;
    }
  };

  const generateText = (uploads) => {
    return new Promise((resolve, reject) => {
      setProcessing(true);
      for (var i = 0; i < uploads.length; i++) {
        Tesseract.recognize(uploads[i], {
          lang: "eng",
        })
          .catch((err) => {
            console.error(err);
            reject(false);
          })
          .then((result) => {
            let confidence = result.confidence;
            let text = result.text;
            let arrayOfLines = text.match(/[^\r\n]+/g);
            props.setConfidence(parseInt(confidence));
            props.setTodos(arrayOfLines);
            setProcessing(false);
            props.handleNext();
            resolve(true);
          });
      }
    });
  };
  return (
    <Fragment>
      <Box display="flex" justifyContent="center">
        <BeatLoader color="#6200EE" loading={processing} />
      </Box>
      <UsageDisplay />
      <Box display="flex" justifyContent="center" style={{ margin: 16 }}>
        <Button
          color="primary"
          variant="outlined"
          component="label"
          onChange={handleChangeFile}
        >
          Upload Image
          <input type="file" style={{ display: "none" }} />
        </Button>
      </Box>
    </Fragment>
  );
};

export default UploadImage;
