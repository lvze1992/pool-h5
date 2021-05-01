import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Tab extends Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/pool">pool</Link>
        </h1>
        <h1>
          <Link to="/energy">energy</Link>
        </h1>
        <h1>
          <Link to="/wallet">wallet</Link>
        </h1>
        {this.props.children}
      </div>
    );
  }
}
