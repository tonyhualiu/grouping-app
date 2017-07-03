import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Group from './group';
import * as GroupActions from '../actions/group_actions';

class GroupContainer extends Component {

  render() {
    const groups = this.props.groups.map((group, idx) => {
      return (
          <li key={idx}>
            <Group idx={idx} members={group.members}
              addMemberName={group.addMemberName}
              handleUpdateAddMemberName={(name, groupIdx) =>
                {this.props.groupActions.updateAddMemberName(name, groupIdx)}}
              handleAddMemberClick={(groupIdx) =>
                {this.props.groupActions.addMemberToGroup(groupIdx)}}/>
          </li>
          );
      });
    return (<div>{groups}</div>);
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
