import React, { useState, Fragment } from "react";
import { Stepper, Step, StepLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import UploadImage from "./UploadImage";
import TodoCard from "./TodoCards";
import Summary from "./Summary";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  stepContent: {
    padding: theme.spacing(2),
  },
}));

const Main = (props) => {
  const classes = useStyles();
  const [step, setStep] = useState(0);
  const [todos, setTodos] = useState([]);
  const [confidence, setConfidence] = useState(0);
  const steps = ["Upload Image", "Edit Tods", "Summary"];
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <UploadImage
            handleNext={handleNext}
            setTodos={setTodos}
            setConfidence={setConfidence}
            handleDialogClose={props.handleDialogClose}
          />
        );
      case 1:
        return (
          <TodoCard
            todos={todos}
            confidence={confidence}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        );
      case 2:{
        return (
          <Summary handleNext={handleNext} setReload={props.setReload} handleDialogClose={props.handleDialogClose}/>
        )
      }
      default:
        return <UploadImage
        handleNext={handleNext}
        setTodos={setTodos}
        setConfidence={setConfidence}
        handleDialogClose={props.handleDialogClose}
      />;
    }
  };
  const handleNext = () => {
      setStep(step + 1);
  };
  const handleBack = () => {
    setStep(step - 1);
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
    </Fragment>
  );
};
export default Main;
