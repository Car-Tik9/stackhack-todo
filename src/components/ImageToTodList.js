import { Button, Box } from "@material-ui/core";
import React from "react";


var Tesseract = window.Tesseract
class ImageToTodList extends React.Component {
    state={
        uploads : [],
        patterns:[],
        documents:[]
    }
    handleChangeFile = (event) => {
        if (event.target.files[0]) {
          var uploads = []
          for (var key in event.target.files) {
            if (!event.target.files.hasOwnProperty(key)) continue;
            let upload = event.target.files[key]
            uploads.push(URL.createObjectURL(upload))
          }
          this.setState({
            uploads: uploads
          })
        } else {
          this.setState({
            uploads: []
          })
        }
      }

      generateText = () => {
        let uploads = this.state.uploads
      
        for(var i = 0; i < uploads.length; i++) {
          Tesseract.recognize(uploads[i], {
            lang: 'eng'
          })
          .catch(err => {
            console.error(err)
          })
          .then(result => {
            // Get Confidence score
            let confidence = result.confidence
      
            // Get full output
            let text = result.text
            let arrayOfLines = text.match(/[^\r\n]+/g);
            // Get codes
            let pattern = /\b\w{10,10}\b/g
            let patterns = result.text.match(pattern);
      
            // Update state
            this.setState({ 
              patterns: this.state.patterns.concat(patterns),
              documents: this.state.documents.concat({
                pattern: patterns,
                text: text,
                confidence: confidence
              })
            })
          })
        }
      }

  render() {
    return (
    <Box>
      <Button
        color="primary"
        variant="outlined"
        component="label"
        onChange={this.handleChangeFile}
      >
        Upload Image
        <input type="file" style={{ display: "none" }} />
      </Button>
      <Button
        color="primary"
        variant="outlined"
        component="label"
        onClick={this.generateText}
      >
        Generate Todo
      </Button>

    </Box>
    );
  }
}

export default ImageToTodList;
