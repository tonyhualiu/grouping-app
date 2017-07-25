import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ContentClear from 'material-ui/svg-icons/content/clear';
import IconButton from 'material-ui/IconButton';
import { Card, CardHeader, CardActions } from 'material-ui/Card';
import { ListItem } from 'material-ui/List';
import PersonAdd from 'material-ui/svg-icons/social/person-add';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import { DropTarget } from 'react-dnd';

import Member from './member';
import './group.css';

const groupTarget = {
  canDrop(props, monitor) {return true;},

  drop(props, monitor, component) {
    const member = monitor.getItem();
    props.handleMoveMember(member.name, member.groupIdx, props.idx);
    return {moved: true};
  },
};

const collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  }
}

class Group extends Component {

  handleUpdateAddMemberName(e) {
    this.props.handleUpdateAddMemberName(e.target.value, this.props.idx);
  }

  handleAddMemberClick(e) {
    this.props.handleAddMemberClick(this.props.idx, this.props.addMemberName);
  }

  handleRemoveMemberClick(e, member) {
    this.props.handleRemoveMemberClick(this.props.idx, member);
  }

  renderRemoveGroupButton() {
    return this.props.idx === 0 ? '' : (
      <FloatingActionButton onTouchTap={(e) =>
        this.props.handleRemoveGroupClick(this.props.idx)}>
        <ContentClear />
      </FloatingActionButton>);
  };

  render() {
    const members = this.props.members.map((member, idx) => {
      return (
            <Member
                key={idx}
                groupIdx={member.groupIdx}
                name={member.name}
                onRemoveMemberClick={(e) => {this.handleRemoveMemberClick(e,
                    member);}} />
          );
    });
    const groupName =
      this.props.idx === 0 ? 'Unassigned Group' : `Group ${this.props.idx}`;
    const memberCount = this.props.members.length;
    const addMemberButton =
      (<IconButton
          className={"group__add-member-button"}
          style={{top: 15}}
          onTouchTap={(e) => {this.handleAddMemberClick(e)}}>
        <PersonAdd />
      </IconButton>);
    return this.props.connectDropTarget(
        <div>
          <Card zDepth={5} className="group">
            <CardHeader
              title={`${groupName}`}
              subtitle={`${memberCount} people`}/>
            <div className="group__member-container">
              {members}
            </div>
            <CardActions>
              <ListItem
                  rightIconButton={addMemberButton}>
                <TextField
                  hintText="Type in member name"
                  value={this.props.addMemberName}
                  onChange={(e) => {this.handleUpdateAddMemberName(e)}} />
              </ListItem>
              {this.renderRemoveGroupButton()}
            </CardActions>
          </Card>
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
  handleRemoveGroupClick: PropTypes.func,
  handleMoveMember: PropTypes.func,
};

Group.defaultProps = {
  addMemberName: '',
}

export default DropTarget('member', groupTarget, collect)(Group);
