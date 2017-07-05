import React, { Component } from 'react';

class Shelf extends Component {
  constructor(props){
    super(props);
    //this.onClickAdd =this.onClickAdd.bind(this);
    this.state = {
      shelfItems: ['shampoo', 'something', 'foobar'],
    };
  }

  onClickAdd(item) {
    this.props.addItem(item);
  }

  render() {
    const shelfItem = this.state.shelfItems.map((item, idx) => {
      return (<li key={idx}>
        <button onClick={() => this.onClickAdd(item)}>[+]</button>
        {item}
      </li>);
    })
    return (
        <div>
          <ul>
            {shelfItem}
          </ul>
        </div>
        )
  }
}

export default Shelf;
