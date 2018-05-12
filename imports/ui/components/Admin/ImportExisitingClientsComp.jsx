import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button } from 'react-bootstrap';
import ReactFileReader from 'react-file-reader';

export default class ImportExisitingClientsComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackMessage: '',
      filenameSelected: 'NOTHING SELECTED',
      fileContent: '',
    };
    this.handleFiles = this.handleFiles.bind(this);
  }

  handleFiles(file) {
    console.log('handleFiles:', file)
    this.setState({
      filenameSelected: file.fileList[0].name,
      base64Content: file.base64,
    });
    Meteor.call('importExistingClients', file.base64, (err, result) => {
      if (err) {
        this.setState({
          feedbackMessage: `ERROR: ${err.reason}`,
        });
      } else {
        this.setState({
          feedbackMessage: `SUCCESS: ${result}`,
        });
      }
    });
  }

  render() {
    return (
      <div className="import-existing-clients">
        {this.state.feedbackMessage ?
          <div>
            <h1>FEEDBACK:</h1>
            <div>{this.state.feedbackMessage}</div>
          </div>
        : ''}
        <h1 className="text-center">Import existing clients</h1>
        <ReactFileReader fileTypes={['.csv']} base64={true} multipleFiles={false} handleFiles={this.handleFiles}>
          <Button bsStyle="primary">Upload File</Button>
        </ReactFileReader>
        <h4>{this.state.filenameSelected}</h4>
        {this.state.fileContent ?
          <div>
            <h1>FILE CONTENT:</h1>
            <div>{this.state.base64Content}</div>
            <div>{this.state.csvFile}</div>
          </div>
        : ''}
      </div>
    );
  }
}
