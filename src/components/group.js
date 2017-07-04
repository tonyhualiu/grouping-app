import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
            <Member name={member.name}/>
            <button onClick={(e) => {this.handleRemoveMemberClick(e, member);}}>
              Remove
            </button>
          </li>
          );
    });
    const groupName =
      this.props.idx === 0 ? 'Unassigned Group' : `Group ${this.props.idx}`;
    return (
        <div>
          <h2>{`${groupName}:`}</h2>
          <input type="text" name="add-member" value={this.props.addMemberName}
            onChange={(e) => {this.handleUpdateAddMemberName(e)}}/>
          <button onClick={(e) => {this.handleAddMemberClick(e)}}>
            Add a Member
          </button>
          <ul>
            {members}
          </ul>
        </div>);
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
