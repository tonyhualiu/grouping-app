import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

class Member extends Component {

  render() {
    return (
        <Chip
            onRequestDelete={(e) => {this.props.onRemoveMemberClick(e)}}>
          <span>{this.props.name}</span>
        </Chip>
        );
  }
}

Member.propTypes = {
  name: PropTypes.string.required,
  onRemoveMemberClick: PropTypes.func,
};

export default Member;
