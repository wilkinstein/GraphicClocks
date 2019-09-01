import React, { Component } from 'react';
import './App.css';
import About from './Components/About';
import Clock from './Components/Clocks/Clock';
import GlitchClock from './Components/Clocks/GlitchClock';
import LineClock from './Components/Clocks/LineClock';
import RoyClock from './Components/Clocks/RoyClock';
import MenuBar from './Components/MenuBar';
import PlayOptions from './Components/PlayOptions';

class App extends Component {

  constructor() {
    super();
    this.state={
      clockChoice: 0, 
      clockChoiceCounter: 1,
      clockSequence: '',
      clockSelection: '',
      frequency: '15', 
      frequencyCounter: 0, 
      mainModuleChoice: 0,
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

  clockSelect(clock) {
      switch(clock) {
        case 0 : return <RoyClock/>;break;
        case 1 : return <Clock/>; break;
        case 2 : return <GlitchClock/>; break;
        case 3 : return <LineClock/>; break;
        default : return <RoyClock/>; break;
      }
    }

  clockSequence(selection, sequence, frequency) {
    
    this.setState({clockSequence: sequence});
    this.setState({frequency: frequency});
    this.setState({clockSelection: selection});

    this.changeMainModule(0);

    console.log(this.state.clockSelection);

  }

  changeClock(x) {
    let clockChoice = x;
    let clockCounter = this.state.clockChoiceCounter;

    if (clockChoice > 15) {clockChoice = 0;this.setState({clockChoice: 0});}
    if (clockCounter < 2) {this.setState({clockChoiceCounter: this.state.clockChoiceCounter += 1});}
    else {this.setState({clockChoiceCounter: 0});}

    if (clockChoice ===  0){
         this.setState({clockChoice: 0});
    }
    if(clockChoice === 1){
          this.setState({clockChoice: 1});
    }
    if(clockChoice === 2){
          this.setState({clockChoice: 2});
    }
    if(clockChoice === 3){
          this.setState({clockChoice: 3});
    }
  }

  changeMainModule(x){
    let mainModuleChoice = x;
    if (mainModuleChoice ===  0){
         this.setState({mainModuleChoice: 0});
    }
    if(mainModuleChoice === 1){
          this.setState({mainModuleChoice: 1});
    }
    if(mainModuleChoice === 2){
          this.setState({mainModuleChoice: 2});
    }
  }

  getRandomInt() {
    let randomInt =Math.floor(Math.random() * Math.floor(3));

    if (randomInt == this.state.clockChoice) {
      while (randomInt == this.state.clockChoice) {
        randomInt = Math.floor(Math.random() * Math.floor(3));
      }
    }

    return randomInt;
  }

  tick() {
    
    let clockSelection = this.state.clockSelection;
    let random = this.getRandomInt();
    let frequency = parseInt(this.state.frequency, 10);
    this.setState({frequencyCounter: this.state.frequencyCounter += 1});

    if (clockSelection != 'Single Clock' && this.state.frequencyCounter > frequency) {this.setState({frequencyCounter: 0})}

      if (this.state.frequencyCounter === 5 && (this.state.frequency == '5' && clockSelection != "Single Clock")) {
        if (this.state.clockChoice > 1) {
          this.setState({clockChoice: 0});
          this.setState({frequencyCounter: 0});
        }
        else {
          if (this.state.clockSequence == 'Random Clocks') {
            this.setState({clockChoice: random});
          }
          else {
            this.setState({clockChoice: this.state.clockChoice += 1});
          }
          this.setState({frequencyCounter: 0});
        }
      }

      else if (this.state.frequencyCounter === 15 && (this.state.frequency == '15' && clockSelection != "Single Clock")) {
        if (this.state.clockChoice > 1) {
          this.setState({clockChoice: 0});
          this.setState({frequencyCounter: 0});
        }
        else {
          if (this.state.clockSequence == 'Random Clocks') { 
            this.setState({clockChoice: random});
          }
          else {
            this.setState({clockChoice: this.state.clockChoice += 1});
          }
          this.setState({frequencyCounter: 0});
        }
      }

      else if (this.state.frequencyCounter === 60 && (this.state.frequency == '60' && clockSelection != "Single Clock")) {
        if (this.state.clockChoice > 1) {
          this.setState({clockChoice: 0});
          this.setState({frequencyCounter: 0});
        }
        else {
          if (this.state.clockSequence == 'Random Clocks') { 
            this.setState({clockChoice: random});
          }
          else {
            this.setState({clockChoice: this.state.clockChoice += 1});
          }
          this.setState({frequencyCounter: 0});
        }
      }

      else if (this.state.frequencyCounter === 900 && (this.state.frequency == '900' && clockSelection != "Single Clock")) {
        if (this.state.clockChoice > 1) {
          this.setState({clockChoice: 0});
          this.setState({frequencyCounter: 0});
        }
        else {
          if (this.state.clockSequence == 'Random Clocks') { 
            let random = Math.floor(Math.random() * Math.floor(2));
            this.setState({clockChoice: random});
          }
          else {
            this.setState({clockChoice: this.state.clockChoice += 1});
          }
          this.setState({frequencyCounter: 0});
        }
      }
  }

  render() {

    const clockChoice = this.state.clockChoice;
    const mainModuleChoice = this.state.mainModuleChoice

    let clockCounter = this.state.clockChoiceCounter;

    return (
      <div className="App">
        <header className="App-header">
          	<MenuBar changeMainModule={this.changeMainModule.bind(this)} changeClock={this.changeClock.bind(this)}/>
        </header>
        <main>
        	{mainModuleChoice ===0?
            <div className="clockShell">
              <div className="clockWrapper">
                {this.clockSelect(this.state.clockChoice)}
              </div>
              <div className="clockNext">
                <a href="#" onClick={()=> this.changeClock(clockCounter)}>
                  Next <br/> Clock
                </a>
              </div>
            </div>
            :(mainModuleChoice === 1? 
              <PlayOptions clockSequence={this.clockSequence.bind(this)}/>
              :<About/>)}
        </main>
      </div>
    );
  }
}

export default App;
