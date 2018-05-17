import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert } from 'react-bootstrap';
import moment from 'moment/moment';
import './ActiveGamesLayoutComp.less';
import ActiveGamePanelComp from './ActiveGamePanelComp'

export default class ActiveGamesLayoutComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount() {
  }
  render() {
    const { ActiveGamesSetupList } = this.props;
    let panelsRowDisplay = [];
    return (
      <div id="active-games-layout-comp">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-10 active-games-layout-area">
              <div className="col-md-6 offset-md-3 heading-area">
                <div className="text-center">This Weekend's Games</div>
                <hr />
              </div>
              <div className="active-games-layout-panel-area">
                {
                  ActiveGamesSetupList.map((gameSetup, i, arr) => {
                  if (i % 3 === 0) {
                    panelsRowDisplay = [];
                  }
                  panelsRowDisplay.push(
                    <div className="col-xs-4">
                      <ActiveGamePanelComp gameSetup={gameSetup} />
                    </div>);
                  if ((i % 2 === 0 && i !== 0)) {
                    return (
                      <div className="row">
                        {panelsRowDisplay}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
