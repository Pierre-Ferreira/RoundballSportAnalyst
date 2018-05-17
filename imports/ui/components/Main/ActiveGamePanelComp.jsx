import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Panel, Alert, Button } from 'react-bootstrap';
import moment from 'moment/moment';
import './ActiveGamePanelComp.less';

export default class ActiveGamePanelComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
  }
  render() {
    const {
      gameHostTeam,
      gameHostAlias,
      gameVisitorTeam,
      gameVisitorAlias,
      gameKickoff,
      gameVenue,
      gameCity,
      gameDate,
      gameSequenceNo,
    } = this.props.gameSetup;

    return (
      <div id="active-game-panel-comp">
        <Panel className="active-game-panel">
          <Panel.Heading>
            <Panel.Title componentClass="h3">Game #{gameSequenceNo}</Panel.Title>
          </Panel.Heading>
          <Panel.Body className="active-game-panel-body">
            <div className="game-row2">{moment(gameDate).format('dddd, MMMM Do YYYY')}</div>
            <div className="game-row1">{gameHostAlias} <span className='game-vs'>vs</span> {gameVisitorAlias}</div>
            <div className="game-row2">{gameVenue}</div>
            <div className="game-row2">{gameCity}</div>
            <div className="game-row3">({gameKickoff})</div>
            {/* <Button>Analyze</Button> */}
          </Panel.Body>
          <Panel.Footer>ACTIVE</Panel.Footer>
        </Panel>
      </div>
    );
  }
}
