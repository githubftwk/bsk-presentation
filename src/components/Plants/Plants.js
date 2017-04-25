import React, { Component } from 'react';
import './Plants.css';
import Plant from '../Plant/Plant';

class Plants extends Component {
  render() {
    return (
      <div className="plantsRoot">
        <div className="plants_item">
          <Plant moisture="80" />
        </div>
        <div className="plants_item">
          <Plant moisture="20" />
        </div>
        <div className="plants_item">
          <Plant moisture="70" />
        </div>
      </div>
    );
  }
}

export default Plants;
