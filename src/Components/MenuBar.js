import React, { Component } from 'react';
import '../App.css';

class MenuBar extends Component {

  constructor() {
    super();
    this.state={
      hours: new Date().getHours().toLocaleString(),
      minutes: new Date().getMinutes().toLocaleString(),
      seconds: new Date().getSeconds().toLocaleString(),
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      hours: new Date().getHours().toLocaleString(),
    });
    this.setState({
      minutes: new Date().getMinutes().toLocaleString(),
    });
    this.setState({
      seconds: new Date().getSeconds().toLocaleString(),
    });
  }

  render() {

    return (
      <div>
      <div className="headerHome">
              <a href="#">Graphic Clocks</a>
            </div>
            <div className="menuItems">
              <p  className="clockList" onClick={() => this.props.changeMainModule(0)}>
                Clock List
              </p>
              <p onClick={() => this.props.changeMainModule(1)}>
                Play Options
              </p>
              <a onClick={() => this.props.changeMainModule(2)}>
                About
              </a>
              <p className="headerTime">
                {this.state.hours}:
                {this.state.minutes}:
                {this.state.seconds}
              </p>
              <div className="dropDownMenu" id="dropDownMenu">
                <ul>
                  <li onClick={() => this.props.changeClock(0)}>Roy Clock</li>
                  <li onClick={() => this.props.changeClock(1)}>Circle Clock</li>
                  <li onClick={() => this.props.changeClock(2)}>Glitch Clock</li>
                  <li onClick={() => this.props.changeClock(3)}>Line Clock</li>
                </ul>
                <ul>
                  <li></li>
                </ul>
              </div>
            </div>
      </div>
    );
  }
}

export default MenuBar;