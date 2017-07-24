import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import './member.css';

class Member extends Component {

  render() {
    return (
        <Chip
            className="member"
            style={{margin: '3px',}}
            onRequestDelete={(e) => {this.props.onRemoveMemberClick(e)}}>
          <span>{this.props.name}</span>
        </Chip>
        );
  }
}

Member.propTypes = {
  name: PropTypes.string,
  onRemoveMemberClick: PropTypes.func,
};

export default Member;
