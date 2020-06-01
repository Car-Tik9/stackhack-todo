import React from "react";
import { Chip } from "@material-ui/core";

export const getPriorityChip = (priority) => {
  switch (priority) {
    case 1:
      return (
        <Chip
          style={{ backgroundColor: "#7fd9ff", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="Low"
        >
        </Chip>
      );
    case 2:
      return (
        <Chip
          size="small"
          style={{ backgroundColor: "#98c14a", "cursor": "pointer", "color": "white"}}
          variant="contained"
          label="Medium"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ backgroundColor: "#dc143c", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="High"
        >
        </Chip>
      );
    default:
      return (
        <Chip
          style={{ backgroundColor: "#7fd9ff", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="Low"
        >
        </Chip>
      );
  }
};

export const getStatusChip = (status) => {
  switch (status) {
    case 1:
      return (
        <Chip
          style={{ backgroundColor: "rgb(252, 113, 80)", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="New"
        >
        </Chip>
      );
    case 2:
      return (
        <Chip
          size="small"
          style={{ backgroundColor: "rgb(81, 133, 252)", "cursor": "pointer", "color": "white"}}
          variant="contained"
          label="In progress"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ backgroundColor: "rgb(77, 215, 120)", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="Completed"
        >
        </Chip>
      );
    default:
      return (
        <Chip
          style={{ backgroundColor: "rgb(252, 113, 80)", "cursor": "pointer", "color": "white"}}
          size="small"
          variant="contained"
          label="New"
        >
        </Chip>
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
      return (
        <Chip
          style={{ color: "#fc7150" }}
          size="small"
          variant="outlined"
          label="Personal"
        >
        </Chip>
      );
  }
};
