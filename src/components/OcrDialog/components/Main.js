import React, { useState, Fragment } from "react";
import { Stepper, Step, StepLabel, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UploadImage from "./UploadImage";
import TodoCard from "./TodoCards";
import BeatLoader from "react-spinners/BeatLoader";

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

const Main = (props) => {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [uploads, setUploads] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [todos, setTodos] = useState([]);
  
  const steps = ["Upload Image", "Edit Tods", "Add Todos"];
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <UploadImage handleFileUploads={setUploads} />;
      case 1:
        return <TodoCard todos={todos} />;
      default:
        return <UploadImage />;
    }
  };
  const handleNext = () => {
    if (step === 0) {
      generateText().then(
        (result) => {
          setProcessing(false);
          setStep(step + 1);
        },
        (err) => {
          alert(err);
        }
      );
    }
  };
  const handleBack = () => {
    setStep(step - 1);
  };

  const generateText = () => {
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
            setTodos(arrayOfLines);
            resolve(true);
          });
      }
    });
  };
  return (
    <Fragment>
      <Stepper activeStep={step} className={classes.stepper}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={classes.stepContent}>{getStepContent(step)}</div>
      <Box display="flex" justifyContent="center">
        <BeatLoader color="#6200EE" loading={processing} />
      </Box>
      <div className={classes.buttons}>
        {step !== 0 && (
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleBack}
          >
            Back
          </Button>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </Fragment>
  );
};
export default Main;