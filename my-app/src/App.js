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
      users: {},
      idKey: '',
      words: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {

  }

  getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
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
        console.log(users);
        console.log(users[socket.id]);
        this.setState({
          users,
          idKey: this.getKeyByValue(users, users[socket.id]),
          words: users[socket.id].words
        });
        console.log(this.state)
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
          <h3>Your words are: {this.state.words.join(' ')}</h3>
        </div>
      );
    }

  }
}

export default App;
