import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';

import Member from './member';

class Group extends Component {

  handleUpdateAddMemberName(e) {
    this.props.handleUpdateAddMemberName(e.target.value, this.props.idx);
  }

  handleAddMemberClick(e) {
    this.props.handleAddMemberClick(this.props.idx);
  }

  handleRemoveMemberClick(e, member) {
    this.props.handleRemoveMemberClick(this.props.idx, member);
  }

  render() {
    const members = this.props.members.map((member, idx) => {
      return (
          <li key={idx}>
            <Chip onRequestDelete={(e) => {this.handleRemoveMemberClick(e, member);}}>
              <Member name={member.name}/>
            </Chip>
          </li>
          );
    });
    const groupName =
      this.props.idx === 0 ? 'Unassigned Group' : `Group ${this.props.idx}`;
    return (
        <Paper zDepth={4}>
          <h2>{`${groupName}:`}</h2>
          <input type="text" name="add-member" value={this.props.addMemberName}
            onChange={(e) => {this.handleUpdateAddMemberName(e)}}/>
          <button onClick={(e) => {this.handleAddMemberClick(e)}}>
            Add a Member
          </button>
          <ul>
            {members}
          </ul>
        </Paper>);
  }
}

Group.propTypes = {
  idx: PropTypes.number,
  members: PropTypes.arrayOf(
      PropTypes.shape({name: PropTypes.string}),
      ),
  addMemberName: PropTypes.string,
  handleUpdateAddMemberName: PropTypes.func,
  handleAddMemberClick: PropTypes.func,
  handleRemoveMemberClick: PropTypes.func,
};

Group.defaultProps = {
  addMemberName: '',
}

export default Group;
