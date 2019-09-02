import React, { Component } from 'react';
import '../../App.css';
import '../../StyleSheets/GlitchClock.css';
import $ from 'jquery';

class GlitchClock extends Component {

  constructor() {
    super();
    this.state={
      hours: new Date().getHours().toLocaleString(),
      minutes: new Date().getMinutes().toLocaleString(),
      seconds: new Date().getSeconds().toLocaleString()
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      1000
    );

        /*eslint-disable no-param-reassign*/

    $(document).ready(function () {

        function second_passed() {
          $('.clock').removeClass('is-off');
        }
        setTimeout(second_passed, 2000)

        $('.switcher').on('click', function(e) {
          e.preventDefault();
          $('.screen').toggleClass('glitch');
        });


        var newDate = new Date();
        newDate.setDate(newDate.getDate());

        setInterval( function() {

          var hours    = new Date().getHours();
          var seconds  = new Date().getSeconds();
          var minutes  = new Date().getMinutes();

          var realTime = ( hours < 10 ? '0' : '' ) + hours + ' : ' + ( minutes < 10 ? '0' : '' ) + minutes + ' : ' + ( seconds < 10 ? '0' : '' ) + seconds

          $('.time').html(realTime);
          $('.time').attr('data-time', realTime);

        }, 1000);

      });
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
        <a className="switcher" href="#"></a>
        <div className="screen glitch">
          <div className="clock is-off"><span className="time" data-time=""></span></div>
          <div className="figure"></div>
          <div className="figure-mask"></div>
        </div>
      </div>
    );
  }
}

export default GlitchClock;
