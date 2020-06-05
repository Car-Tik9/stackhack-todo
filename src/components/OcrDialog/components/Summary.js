import React, { Fragment } from "react";
import EmptyData from "../../EmptyData";
import HappyIcon from "@material-ui/icons/MoodRounded";
import { Box, Button } from "@material-ui/core";
import history from "../../../utils/history";

const Summary = (props) => {
  const handleGoToDashBoardClick = () => {
    props.handleDialogClose(false);
    props.setReload(true);
  };
  return (
    <Fragment>
      <EmptyData
        height={300}
        message="Todos has been successfully added"
      ><HappyIcon style={{fontSize:150}}></HappyIcon></EmptyData>
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
