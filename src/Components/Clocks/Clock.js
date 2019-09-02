import React, { Component } from 'react';
import '../../App.css';
import '../../StyleSheets/Clock.css';

class Clock extends Component {

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

    const polyfill = (() => {
      let clock = Date.now();

      return (callback) => {
        const currentTime = Date.now();

        if (currentTime - clock > 16) {
          clock = currentTime;
          callback(currentTime);
        } else {
          setTimeout(
            () => {
              polyfill(callback);
            },
            0
          );
        }
      };
    })();

    const requestAnimationFrame = window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      polyfill;

    const center = 200;
    const alpha = 0.9;
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    const shadow = {
      color: 'rgba(0,0,0,1)',
      offsetX: 1,
      offsetY: 0,
      blur: 1
    };
    const hourSetup = {
      radie: 175,
      lineWidth: 25,
      back: 48,
      color: `rgba(255,200,0,${alpha})`,
      counter: 0,
      old: 0
    };
    const minSetup = {
      radie: 140,
      lineWidth: 35,
      back: 45,
      color: `rgba(255,30,94,${alpha})`,
      counter: 0,
      old: 0
    };
    const secSetup = {
      radie: 90,
      lineWidth: 55,
      back: 65,
      color: `rgba(90,192,255,${alpha})`,
      counter: 0,
      old: 0
    };
    const milliSetup = {
      radie: 55,
      lineWidth: 5,
      back: 20,
      color: `rgba(30,255,100,${alpha})`,
      counter: 0,
      old: 0
    };
    const draw = (radie, color, lineWidth, firstCount, secondCount, context) => {
      context.beginPath();
      context.arc(center, center, radie, firstCount * Math.PI, secondCount * Math.PI, false);
      context.lineWidth = lineWidth;
      context.shadowColor = shadow.color;
      context.shadowOffsetX = shadow.offsetX;
      context.shadowOffsetY = shadow.offsetY;
      context.shadowBlur = shadow.blur;
      context.strokeStyle = color;
      context.stroke();
    };
    const check = (count, setup, context) => {
      if (count < setup.old) {
        setup.counter += 1;
      }
      if (setup.counter % 2 === 0) {
        draw(setup.radie, setup.color, setup.lineWidth, 0, count, context);
      } else {
        draw(setup.radie, setup.color, setup.lineWidth, count, 0, context);
      }
    };

    const start = () => {
      canvas.width = canvas.width;
      const d = new Date();
      const milliSeconds = d.getMilliseconds();
      const seconds = d.getSeconds() + (d.getMilliseconds() / 1000);
      const minutes = d.getMinutes() + (seconds / 60);
      const hours = (d.getHours() + (minutes / 60)) % 12;
      const hourCount = (2 / 12) * hours;
      const minCount = (2 / 60) * minutes;
      const secCount = (2 / 60) * seconds;
      const milliCount = (2 / 1000) * milliSeconds;
      check(milliCount, milliSetup, ctx);
      check(secCount, secSetup, ctx);
      check(minCount, minSetup, ctx);
      check(hourCount, hourSetup, ctx);
      milliSetup.old = milliCount - 0.01;
      secSetup.old = secCount - 0.01;
      minSetup.old = minCount - 0.01;
      hourSetup.old = hourCount - 0.01;
      requestAnimationFrame(start);
    };

    start();
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
        <div id="shadow">
        </div>
        <canvas width="400" height="400" id="myCanvas"></canvas>
        <div id="shine"></div>
      </div>
    );
  }
}

export default Clock;
