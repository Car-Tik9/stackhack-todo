import React from "react";
import { Button, Chip, Typography, Tooltip } from "@material-ui/core";
import ShoppingIcon from "@material-ui/icons/ShoppingCart";
import WorkIcon from "@material-ui/icons/Work";
import HomeIcon from "@material-ui/icons/Home";
import PersonalIcon from "@material-ui/icons/Face";
import OtherIcon from "@material-ui/icons/More";

export const getPriorityButton = (priority) => {
  switch (priority) {
    case 1:
      return (
        <Button
          style={{
            backgroundColor: "#7fd9ff",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Low
        </Button>
      );
    case 2:
      return (
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "#98c14a",
            cursor: "pointer",
            color: "white",
          }}
        >
          Medium
        </Button>
      );
    case 3:
      return (
        <Button
          style={{
            backgroundColor: "#dc143c",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          High
        </Button>
      );
    default:
      return (
        <Button
          variant="contained"
          style={{
            backgroundColor: "#7fd9ff",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
        >
          Low
        </Button>
      );
  }
};

export const getStatusButton = (status) => {
  switch (status) {
    case 1:
      return (
        <Button
          style={{
            backgroundColor: "rgb(252, 113, 80)",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          New
        </Button>
      );
    case 2:
      return (
        <Button
          size="small"
          variant="contained"
          style={{
            backgroundColor: "rgb(81, 133, 252)",
            cursor: "pointer",
            color: "white",
          }}
        >
          In progress
        </Button>
      );
    case 3:
      return (
        <Button
          style={{
            backgroundColor: "rgb(77, 215, 120)",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          Completed
        </Button>
      );
    default:
      return (
        <Button
          style={{
            backgroundColor: "rgb(252, 113, 80)",
            cursor: "pointer",
            color: "white",
          }}
          size="small"
          variant="contained"
        >
          New
        </Button>
      );
  }
};

const ToolTipWrapper = (props) => {
  return (
    <Tooltip
      title={
        <Typography
          style={{ color: "white", padding: 4 }}
          variant="body1"
          component="h1"
        >
          {props.title}
        </Typography>
      }
      arrow
    >
      {props.children}
    </Tooltip>
  );
};

export const getChipLabel = (chipId) => {
  switch (chipId) {
    case 1:
      return (
        <ToolTipWrapper title="Personal">
          <PersonalIcon />
        </ToolTipWrapper>
      );
    case 2:
      return (
        <ToolTipWrapper title="Shopping">
          <ShoppingIcon />
        </ToolTipWrapper>
      );
    case 3:
      return (
        <ToolTipWrapper title="Home">
          <HomeIcon />
        </ToolTipWrapper>
      );

    case 4:
      return (
        <ToolTipWrapper title="Work">
          <WorkIcon />
        </ToolTipWrapper>
      );
    case 5:
      return (
        <ToolTipWrapper title="Other">
          <OtherIcon />
        </ToolTipWrapper>
      );
    default:
      return null;
  }
};
