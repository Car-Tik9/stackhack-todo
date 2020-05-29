import React from "react";
import { Chip } from "@material-ui/core";

export const getPriorityChip = (priority) => {
  switch (priority) {
    case 1:
      return (
        <Chip
          style={{ backgroundColor: "#7fd9ff" }}
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
          style={{ backgroundColor: "#98c14a" }}
          variant="contained"
          label="Middle"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ backgroundColor: "#dc143c" }}
          size="small"
          variant="contained"
          label="High"
        >
        </Chip>
      );
    default:
      return (
        <Chip
          style={{ backgroundColor: "#7fd9ff" }}
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
          style={{ backgroundColor: "#7fd9ff" }}
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
          style={{ backgroundColor: "#5185fc" }}
          variant="contained"
          label="In progress"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ backgroundColor: "#4dd778" }}
          size="small"
          variant="contained"
          label="Completed"
        >
        </Chip>
      );
    default:
      return (
        <Chip
          style={{ backgroundColor: "#fc7150" }}
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
          style={{ backgroundColor: "#7fd9ff" }}
          size="small"
          variant="contained"
          label="Personal"
        >
        </Chip>
      );
    case 2:
      return (
        <Chip
          size="small"
          style={{ backgroundColor: "#5185fc" }}
          variant="contained"
          label="Shopping"
        >
        </Chip>
      );
    case 3:
      return (
        <Chip
          style={{ backgroundColor: "#4dd778" }}
          size="small"
          variant="contained"
          label="Home"
        >
        </Chip>
      );

    case 4:
      return (
        <Chip
          style={{ backgroundColor: "#4dd778" }}
          size="small"
          variant="contained"
          label="Work"
        >
        </Chip>
      );
    case 5:
      return (
        <Chip
          style={{ backgroundColor: "#4dd778" }}
          size="small"
          variant="contained"
          label="Other"
        >
        </Chip>
      );
    default:
      return (
        <Chip
          style={{ backgroundColor: "#fc7150" }}
          size="small"
          variant="contained"
          label="New"
        >
        </Chip>
      );
  }
};
