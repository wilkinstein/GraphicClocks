import React, { Component } from 'react';
import '../App.css';

class ClockSelector extends Component {

  constructor() {
    super();
    this.state={
      clockListId: 0,
      clockName: '',
      clockPageURL: '',
      clockPageMultiClockID: ''
    };
  }

  componentDidMount() {
  }

  render() {

    return (
      <div className="clockSelectorWrapper">
        
      </div>
    );
  }
}

export default ClockSelector;