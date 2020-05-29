import React from "react";
import { Button} from "@material-ui/core";

export const getPriorityButton = (priority) => {
  switch (priority) {
    case 1:
      return (
        <Button style={{backgroundColor: "#7fd9ff"}} size="small" variant="contained">
          Low
        </Button>
      );
    case 2:
      return (
        <Button size="small" style={{backgroundColor: "#98c14a"}} variant="contained">
          Middle
        </Button>
      );
    case 3:
      return (
        <Button style={{backgroundColor: "#dc143c"}} size="small" variant="contained">
          High
        </Button>
      );
    default:
      return (
        <Button style={{backgroundColor: "#7fd9ff"}} size="small" variant="contained">
          Low
        </Button>
      );
  }
};
