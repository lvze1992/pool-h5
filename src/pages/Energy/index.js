import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Energy extends Component {
  render() {
    return (
      <div>
        <h1>Energy</h1>
        <Link to="/setting">setting</Link>
      </div>
    );
  }
}
