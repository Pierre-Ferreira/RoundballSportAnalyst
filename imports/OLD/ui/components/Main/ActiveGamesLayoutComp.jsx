import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Alert } from 'react-bootstrap';
import moment from 'moment/moment';
import './ActiveGamesLayoutComp.less';
import ActiveGamePanelContainer from '../../containers/Main/ActiveGamePanelContainer'

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
    let returnVal = []
    return (
      <div id="active-games-layout-comp">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-10 active-games-layout-area">
              <div className=" heading-area col-md-6 offset-md-3 row">
                <div className="text-center">This Weekend's Games</div>
                <hr />
              </div>
              <div className="active-games-layout-panel-area">
                {
                  ActiveGamesSetupList.map((gameSetup, i, arr) => {
                  panelsRowDisplay.push(
                    <div className="col-xs-4">
                      <ActiveGamePanelContainer
                        {...this.props}
                        history={this.props.history}
                        gameSetup={gameSetup}
                        key={gameSetup._id}
                      />
                    </div>);
                  if (panelsRowDisplay % 3 === 0 || (arr.length - 1) === i) {
                    returnVal = panelsRowDisplay.slice();
                    panelsRowDisplay = [];
                    return (
                      <div className="row">
                        {returnVal}
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
