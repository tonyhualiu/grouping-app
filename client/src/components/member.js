import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Chip from 'material-ui/Chip';
import { DragSource  } from 'react-dnd';

const Types = {
  MEMBER: 'member',
};

const memberSource = {
  beginDrag(props, monitor, component) {
    return {
      groupIdx: props.groupIdx,
      name: props.name,
    };
  }
};

const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
};

class Member extends Component {

  render() {
    return this.props.connectDragSource(
        <div>
          <Chip
              className="member"
              style={{margin: '3px',
                      opacity: this.props.isDragging? 0.5: 1}}
              onRequestDelete={(e) => {this.props.onRemoveMemberClick(e)}}>
            <span>{this.props.name}</span>
          </Chip>
        </div>
        );
  }
}

Member.propTypes = {
  groupIdx: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  onRemoveMemberClick: PropTypes.func,
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
};

export default DragSource(Types.MEMBER, memberSource, collect)(Member);
