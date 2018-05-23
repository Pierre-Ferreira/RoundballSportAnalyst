import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Grid } from 'react-bootstrap';
// import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';
// Public components.
import HomepageComp from '../Main/HomepageComp';
import SignupContainer from '../../containers/Auth/SignupContainer';
import LoginContainer from '../../containers/Auth/LoginContainer';
import ResetPasswordContainer from '../../containers/Auth/ResetPasswordContainer';
import VerifyEmailContainer from '../../containers/Auth/VerifyEmailContainer';
import ForgotPasswordContainer from '../../containers/Auth/ForgotPasswordContainer';
import IntroducerSearchContainer from '../../containers/Auth/IntroducerSearchContainer';
// Auth Admin components.
import blockchainAPIPaymentsContainer from '../../containers/Admin/blockchainAPIPaymentsContainer';
import UserSettingsComp from '../Main/UserSettings/UserSettingsComp';
import MyTeamComp from '../Main/MyTeamComp';
import GameSetupEditorContainer from '../../containers/Admin/GameSetupEditorContainer';
import GameRunningEditorContainer from '../../containers/Main/GameRunningEditorContainer';
// Auth Members components.
import WelcomeContainer from '../../containers/Main/WelcomeContainer';
import PlayerAnalysisEditorContainer from '../../containers/Main/PlayerAnalysisEditorContainer';
import MainStatsViewerContainer from '../../containers/Main/MainStatsViewerContainer';
// Helper components.
import AuthenticatedRouteComp from '../Routes/AuthenticatedRouteComp';
import PublicRouteComp from '../Routes/PublicRouteComp';
import './MainComp.less';
// import { withHistory, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';


export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { authenticated } = this.props;
    const backgroundStyle = authenticated ? 'background-auth' : 'background-public';
    return (
      <div id="main-page-comp" className={backgroundStyle}>
        <Grid>
          <div>
            <Switch>
              {/* <Route exact path="/" component={HomepageComp} /> */}
              <PublicRouteComp exact path="/" component={HomepageComp} />
              <AuthenticatedRouteComp exact path="/admin/blockchain_api" component={blockchainAPIPaymentsContainer} {...this.props} />
              <AuthenticatedRouteComp exact path="/admin/game_setup_editor" component={GameSetupEditorContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/signup" component={SignupContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/signup/introducer_search" component={IntroducerSearchContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/login" component={LoginContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/forgot_password" component={ForgotPasswordContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/reset-password/:token" component={ResetPasswordContainer} {...this.props} />
              <PublicRouteComp exact path="/auth/verified-email" component={VerifyEmailContainer} {...this.props} />
              <AuthenticatedRouteComp exact path="/main/welcome" component={WelcomeContainer} {...this.props} />
              <AuthenticatedRouteComp exact path="/settings" component={UserSettingsComp} {...this.props} />
              <AuthenticatedRouteComp exact path="/myteam" component={MyTeamComp} {...this.props} />
              <AuthenticatedRouteComp exact path="/game/analysis/:gameSetupId" component={PlayerAnalysisEditorContainer} {...this.props} />
              <AuthenticatedRouteComp exact path="/game/running/editor/:gameSetupId" component={GameRunningEditorContainer} {...this.props} />
              <AuthenticatedRouteComp exact path="/game/running/stats_viewer/:gameSetupId" component={MainStatsViewerContainer} {...this.props} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Grid>
      </div>
    );
  }
}
//
// MainPage.propTypes = {
//   // username: React.PropTypes.string
// };
