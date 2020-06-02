import React from "react";
import { Button, Chip } from "@material-ui/core";

export const getPriorityButton = (priority) => {
  switch (priority) {
    case 1:
      return (
        <Button
          style={{ backgroundColor: "#7fd9ff", "cursor": "pointer", "color": "white"}}
          size="small"
        >Low
        </Button>
      );
    case 2:
      return (
        <Button
          size="small"
          style={{ backgroundColor: "#98c14a", "cursor": "pointer", "color": "white"}}
        >Medium
        </Button>
      );
    case 3:
      return (
        <Button
          style={{ backgroundColor: "#dc143c", "cursor": "pointer", "color": "white"}}
          size="small"
        >High
        </Button>
      );
    default:
      return (
        <Button
          style={{ backgroundColor: "#7fd9ff", "cursor": "pointer", "color": "white"}}
          size="small"
        >Low
        </Button>
      );
  }
};

export const getStatusButton = (status) => {
  switch (status) {
    case 1:
      return (
        <Button
          style={{ backgroundColor: "rgb(252, 113, 80)", "cursor": "pointer", "color": "white"}}
          size="small"
        >New
        </Button>
      );
    case 2:
      return (
        <Button
          size="small"
          style={{ backgroundColor: "rgb(81, 133, 252)", "cursor": "pointer", "color": "white"}}
        >In progress
        </Button>
      );
    case 3:
      return (
        <Button
          style={{ backgroundColor: "rgb(77, 215, 120)", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="default"
        >Completed
        </Button>
      );
    default:
      return (
        <Button
          style={{ backgroundColor: "rgb(252, 113, 80)", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="default"
        >New
        </Button>
      );
  }
};

export const getChipLabel = (chipId) => {
  switch (chipId) {
    case 1:
      return (
        <Chip
          style={{ color: "#7fd9ff"}}
          size="small"
          variant="outlined"
          label="Personal"
        >
        </Chip>
      );
    case 2:
      return (
        <Chip
          size="small"
          style={{ color: "#5185fc"}}
          variant="outlined"
          label="Shopping"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ color: "#4dd778" }}
          size="small"
          variant="outlined"
          label="Home"
        >
        </Chip>
      );

    case 4:
      return (
        <Chip
          style={{ color: "#4dd778" }}
          size="small"
          variant="outlined"
          label="Work"
        >
        </Chip>
      );
    case 5:
      return (
        <Chip
          style={{ color: "#4dd778" }}
          size="small"
          variant="outlined"
          label="Other"
        >
        </Chip>
      );
    default:
      return null
  }
};
