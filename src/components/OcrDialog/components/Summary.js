import React, { Fragment } from "react";
import EmptyData from "../../EmptyData";
import HappyIcon from "@material-ui/icons/MoodRounded";
import { Box, Button } from "@material-ui/core";
import history from "../../../utils/history";

const Summary = (props) => {
  const handleGoToDashBoardClick = () => {
    props.handleDialogClose(false);
    history.push("/dashboard");
  };
  return (
    <Fragment>
      <EmptyData
        height={300}
        icon={HappyIcon}
        message="Todos has been successfully added"
      ></EmptyData>
      <Box display="flex" justifyContent="flex-end">
        <Button
          variant="contained"
          style={{ marginRight: 8 }}
          onClick={props.handleNext}
        >
          Upload Image
        </Button>
        <Button
          variant="contained"
          onClick={handleGoToDashBoardClick}
          color="primary"
        >
          Go to dashboard{" "}
        </Button>
      </Box>
    </Fragment>
  );
};
export default Summary;
