/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import Home from './components/Home'

class venueserch extends Component {
  render() {

    return (
      <Home />
    )
    
  }
}


AppRegistry.registerComponent('venueserch', () => venueserch)
