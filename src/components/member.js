import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Member extends Component {

  render() {
    return (
        <div>
          {this.props.name}
        </div>
        );
  }
}

Member.propTypes = {
  name: PropTypes.string,
};

export default Member;
