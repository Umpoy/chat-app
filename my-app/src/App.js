import React, { Component } from 'react';
import { subscribeToTimer } from './api';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      form: { name: '' },
      inLobby: false,
      users: {}
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    console.log('updated');
  }

  handleInputChange(event) {
    const { value, name } = event.target;
    const { form } = this.state;
    form[name] = value;
    this.setState({
      form: { ...form }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const person = this.state.form.name
    socket.emit('connected', person);
    socket.on('connected', person => {
      socket.on('grabUsers', (users) => {
        this.setState({ users });
        console.log(this.state.users)
      });
    });
    //this.state.
    this.loggedIn();
  }

  loggedIn() {
    this.setState({
      inLobby: true
    })
  }

  render() {
    const { name } = this.state.form
    if (!this.state.inLobby) {
      return (
        <div className="App">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="name" label="Name" value={name} onChange={this.handleInputChange} />

            <button className="btn btn-outline-primary">Add Contact</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1> Welcome to the lobby {name}</h1>
          <h3>Your words are: </h3>
        </div>
      );
    }

  }
}

export default App;
