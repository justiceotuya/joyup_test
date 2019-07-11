import React, { Component } from 'react';
import Dashboard from './components/dashBoard'
import './App.css'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';


const muiTheme = createMuiTheme({
  typography: {
    fontFamily: 'Rubik, sans-serif',
  },
  palette: {
    primary: {
      main: '#1d7db9'
    }
  }
}
)
class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={muiTheme}>
        <Dashboard />
      </MuiThemeProvider>
    )
  }
}
export default App;
