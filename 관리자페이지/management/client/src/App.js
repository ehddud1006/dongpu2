import React, { Component } from 'react';
import Customer from './components/Customer'
// import './App.css';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Switch, Route, Redirect } from 'react-router-dom';
import Go from './components/Go'
import { BrowserRouter } from 'react-router-dom';
import RestaurantName from './components/RestaurantName';
const App = () => {
  return (
    <BrowserRouter>
      {/* <Redirect exact path="/" to="/main" /> */}
      <Route exact path="/" component={Go} />
      <Route path="/main/:id" component={RestaurantName} />
    </BrowserRouter>
    // <Go></Go>
    // <Switch>
    //   <Redirect exact path="/" to="/main" />
    //   <Route path="/main" component={Go} />
    // </Switch>
    // <Switch>
    //   <Redirect exact path="/" to="/main" />
    //   <Route path="/main" component={go} />
    //   {/* <Route path="/main/:restaurantName" component={Workspace} /> */}
    // </Switch>
  );
};

export default App;