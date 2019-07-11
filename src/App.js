import React from 'react';
import Dashboard from './components/dashBoard'
import './App.css'
import { Redirect, Switch, Route } from 'react-router-dom'
import { createMuiTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import Configure from './components/configure/components/Configure';


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
const App = () => {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <Switch>
        <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/configure" component={Configure} />
      </Switch>
    </MuiThemeProvider>
  )
}
export default App;
