import React, { Component } from 'react';
import '../App.css';

class PlayOptions extends Component {

  constructor() {
    super();
    this.state={
      Order: '',
      Choice: '',
      Frequency: ''
    }
  }

  componentDidMount() {
  }

  playClocks(e) {
    e.preventDefault();

    let choice = document.getElementById("choice");
    let order = document.getElementById("order");
    let frequency = document.getElementById("frequency");

    let strChoice = choice.options[choice.selectedIndex].value;
    let strOrder = order.options[order.selectedIndex].value;
    let strFrequency = frequency.options[frequency.selectedIndex].value;

    console.log(strFrequency);

    this.props.clockSequence(strChoice, strOrder, strFrequency);
  }

  render() {

    return (
      <div>
        <form action="" className="playOptionsForm">
          <select name="What To Play" id="choice">
            <option value="Single Clock">Single Clock</option>
            <option value="All Clocks">All Clocks</option>
            <option value="Favorites">Favorites</option>
          </select>
          <select name="Play Order" id="order">
            <option value="Default Sequence">Default Sequence</option>
            <option value="Random Clocks">Random Clocks</option>
          </select>
          <select name="When To Change" id="frequency">
            <option value="5">Every 5 Seconds</option>
            <option value="15">Every 15 Seconds</option>
            <option value="60">Every Minute</option>
            <option value="900">Every 15 Minutes</option>
          </select>
          <br/>
          <hr/>
          <br/>
         <input type="submit" value="play" onClick={(e)=>this.playClocks(e)}/>
        </form>
      </div>
    );
  }
}

export default PlayOptions;