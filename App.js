
import React, { Component } from 'react';
import Container from './src/component/Navigation';
import { Provider } from 'react-redux';
import store from './src/Redux/Store';

export default class App extends Component {



  render() {
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
}

