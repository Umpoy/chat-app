import React, { Component } from 'react';
import { subscribeToTimer } from './api';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {}

    subscribeToTimer((err, timestamp) => this.setState({
      timestamp
    }));
  }

  render() {
    return (
      <div className="App">
        <h1>Hello World!!!</h1>
      </div>
    );
  }
}

export default App;
