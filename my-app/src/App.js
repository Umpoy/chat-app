import React, { Component } from 'react';
import { subscribeToTimer } from './api';
import { Prompt } from 'react-router';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: { name: '' }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {

    const { value, name } = event.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({
      form: { ...form }
    });
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault();
    const person = this.state.form.name
    socket.emit('connected', person);
    socket.on('connected', person => {
      socket.on('grabUsers', (users) => {
        console.log(users)
      })

    });



  }

  render() {
    const { name } = this.state.form
    return (
      <div className="App">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" label="Name" value={name} onChange={this.handleInputChange} />

          <button className="btn btn-outline-primary">Add Contact</button>
        </form>
      </div>
    );
  }
}

export default App;
