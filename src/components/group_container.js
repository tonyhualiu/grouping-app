import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Group from './group';
import * as GroupActions from '../actions/group_actions';

class GroupContainer extends Component {

  render() {
    const renderRemoveGroupButton = (idx) => {
      return idx === 0 ? '' : (
          <button onClick={(e) => this.props.groupActions.removeGroup(idx)}>
            Remove Group
          </button>);
    };
    const groups = this.props.groups.map((group, idx) => {
      return (
          <div key={idx}>
            {renderRemoveGroupButton(idx)}
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
            />
          </div>
          );
      });
    return (
        <div>
          <button onClick={(e) => {this.props.groupActions.addGroup();}}>
            Add a Group
          </button>
          {groups}
        </div>);
  }
}

function mapStateToProps(state, prop) {
  return {
    groups: state.group,
  }
}

function mapDispaptchToProps(dispatch) {
  return {
    groupActions: bindActionCreators(GroupActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispaptchToProps)(GroupContainer);
