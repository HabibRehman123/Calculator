import React, { Component } from "react";
import "./App.css";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { ClearButton } from "./components/ClearButton";
import * as math from "mathjs";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //route: "signin",
      //isSignedIn: false,
      user: {
        id:'' ,
        name:'' ,
        email:'' ,
        input: ''
      }
    };
  }

  // loadUser = (data) => {
  //   this.setState({user: {
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     input: data.input
  //   }})
  //   console.log('User previous value is ', this.state.user.input)
  // }


  addToInput = val => {
    var user = {...this.state.user}
    user.input=user.input+val
    this.setState({user})
  };

  handleEqual = () => {
    var user = {...this.state.user}
    user.input = math.evaluate(user.input)
    this.setState({user})
    fetch('http://localhost:5000/update', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        //id:this.state.user.id,
        input: this.state.user.input,
      })
    })
    .then(response => response.json())
    .then(response => {
      console.log(response)
    })
  };
  
  handleClear = () => {
    var user = {...this.state.user}
    user.input = ""
    this.setState({user})
  }
  
  render() {
    return (
      <div className="App">

        <div className="calc-wrapper">
          <Input input={this.state.user.input} />
          <div className="row">
            <Button handleClick={this.addToInput}>7</Button>
            <Button handleClick={this.addToInput}>8</Button>
            <Button handleClick={this.addToInput}>9</Button>
            <Button handleClick={this.addToInput}>/</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>4</Button>
            <Button handleClick={this.addToInput}>5</Button>
            <Button handleClick={this.addToInput}>6</Button>
            <Button handleClick={this.addToInput}>*</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>1</Button>
            <Button handleClick={this.addToInput}>2</Button>
            <Button handleClick={this.addToInput}>3</Button>
            <Button handleClick={this.addToInput}>+</Button>
          </div>
          <div className="row">
            <Button handleClick={this.addToInput}>.</Button>
            <Button handleClick={this.addToInput}>0</Button>
            <Button handleClick={this.handleEqual}>=</Button>
            <Button handleClick={this.addToInput}>-</Button>
          </div>
          <div className="row">
            <ClearButton handleClear={this.handleClear}>
              Clear
            </ClearButton>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
