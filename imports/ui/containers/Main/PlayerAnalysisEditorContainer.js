import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux-meteor';
import PlayerAnalysisEditorComp from '../../components/Main/PlayerAnalysisEditorComp';
import GamesSetup from '../../../api/games_setup/collection';

const mapTrackerToProps = (state, props) => {
  const handle = Meteor.subscribe('games_setup_list');
  return {
    loading: !handle.ready(),
    handle,
    GamesSetupList: GamesSetup.find({}, {
      sort: { gameSequenceNo: -1 },
    }).fetch(),
  };
};

function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapTrackerToProps, mapStateToProps, mapDispatchToProps)(PlayerAnalysisEditorComp);
