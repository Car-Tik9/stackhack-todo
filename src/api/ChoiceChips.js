import { Chip, Typography } from "@material-ui/core";
import React, { Fragment } from "react";

const chips = [
  { id: 1, label: "Personal" },
  { id: 2, label: "Shopping" },
  { id: 3, label: "Home" },
  { id: 4, label: "Work" },
  { id: 5, label: "Other" },
];
const ChoiceChips = (props) => {
  return (
    <Fragment>
      <Typography gutterBottom component="legend">
        Labels
      </Typography>
      {chips.map((chip) => (
        <Chip
          clickable={true}
          style={{ marginRight: 8 }}
          label={chip.label}
          key={chip.id}
          color={props.chipId === chip.id ? "primary" : "default"}
          onClick={() => props.handleChipClick(chip.id)}
        />
      ))}
    </Fragment>
  );
};
export default ChoiceChips;
