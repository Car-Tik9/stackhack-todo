import { Button, Box } from "@material-ui/core";
import React from "react";

class UploadImage extends React.Component {
  handleChangeFile = (event) => {
    if (event.target.files[0]) {
      var uploads = [];
      for (var key in event.target.files) {
        if (!event.target.files.hasOwnProperty(key)) continue;
        let upload = event.target.files[key];
        uploads.push(URL.createObjectURL(upload));
      }
      this.props.handleFileUploads(uploads);
    } else {
      this.props.handleFileUploads([]);
    }
  };
  render() {
    return (
      <Box display="flex" justifyContent="center" style={{ margin: 16 }}>
        <Button
          color="primary"
          variant="outlined"
          component="label"
          onChange={this.handleChangeFile}
        >
          Upload Image
          <input type="file" style={{ display: "none" }} />
        </Button>
      </Box>
    );
  }
}

export default UploadImage;
