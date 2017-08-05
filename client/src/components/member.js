import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';

import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';

class Member extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onMemberPopOverOpen(e) {
    e.preventDefault();
    this.setState({anchorEl: e.currentTarget});
    this.props.onMemberPopOverOpen(e);
  }

  renderMenuItems() {
    return this.props.allGroupIdx.map((groupIdx, idx) => {
      const groupName = (idx === 0 ? 'Unassigned' : `Group ${idx}`);
      const isDisabled = ( this.props.groupIdx === groupIdx ? true : false);
      return (
        <MenuItem
          key={idx}
          primaryText={groupName}
          onTouchTap={(e) => {this.props.onMoveMember(this.props.name,
              this.props.groupIdx, idx)}}
          disabled={isDisabled}
        />
      );
    });
  }

  render() {
    return (
        <div>
          <Chip
              className="member"
              style={{margin: '3px',}}
              onRequestDelete={(e) => {this.props.onRemoveMemberClick(e)}}
              onTouchTap={(e) => {this.onMemberPopOverOpen(e);}}>
            <span>{this.props.name}</span>
          </Chip>
          <Popover
              open={this.props.isGroupPickingOpen}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={ (e) => {this.props.onMemberPopOverClose();}}
              animation={PopoverAnimationVertical}>
              <Menu>
                {this.renderMenuItems()}
              </Menu>
          </Popover>
        </div>
        );
  }
}

Member.propTypes = {
  groupIdx: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  allGroupIdx: PropTypes.array,
  isGroupPickingOpen: PropTypes.bool,
  onRemoveMemberClick: PropTypes.func,
  onMemberPopOverOpen: PropTypes.func,
  onMemberPopOverClose: PropTypes.func,
  onMoveMember:PropTypes.func,
};

export default Member;
