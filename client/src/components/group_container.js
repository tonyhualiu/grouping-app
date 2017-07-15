import React, { Component } from 'react';

import AppBar from 'material-ui/AppBar';
import AvLibraryAdd from 'material-ui/svg-icons/av/library-add';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Group from './group';
import * as GroupActions from '../actions/group_actions';

class GroupContainer extends Component {

  componentDidMount() {
    this.props.groupActions.fetchGroups();
  }

  render() {
    const groups = this.props.groups.map((group, idx) => {
      return (
          <div key={idx}>
            <Group
              idx={idx}
              members={group.members}
              addMemberName={group.addMemberName}
              handleUpdateAddMemberName={(name, groupIdx) =>
                {this.props.groupActions.updateAddMemberName(name, groupIdx)}}
              handleAddMemberClick={(groupIdx) =>
                {this.props.groupActions.addMemberToGroup(groupIdx)}}
              handleRemoveMemberClick={(groupIdx, member) =>
                {this.props.groupActions.removeMemberFromGroup(groupIdx, member)}}
              handleRemoveGroupClick={(groupIdx) =>
                {this.props.groupActions.removeGroup(groupIdx)}}
            />
          </div>
          );
      });
    const isSaveButtonDisabled = this.props.isSavingGroups ? true : false;
    const saveButtonText = this.props.isSavingGroups ? 'Saving' : 'Save';
    return (
        <div>
          <AppBar
            title={"Add A Group"}
            iconElementLeft={<IconButton><AvLibraryAdd /></IconButton>}
            iconElementRight={<FlatButton
                                label={ saveButtonText }
                                disabled={ isSaveButtonDisabled }/>}
            onLeftIconButtonTouchTap={(e) => {this.props.groupActions.addGroup();}}
            onRightIconButtonTouchTap={(e) =>
              {this.props.groupActions.saveGroups(this.props.groups);}}
           >
          </AppBar>
          {groups}
        </div>);
  }
}

function mapStateToProps(state, prop) {
  return {
    groups: state.group.groups,
    isSavingGroups: state.group.isSavingGroups,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    groupActions: bindActionCreators(GroupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupContainer);
