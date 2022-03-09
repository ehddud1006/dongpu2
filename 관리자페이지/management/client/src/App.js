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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class App extends Component {
  state = {
    customers: '',
    completed: 0
  }

  componentDidMount() {
    // 0.02초 마다 수행된다.
    this.timer = setInterval(this.progress, 100);
    this.callApi()
      .then(res => this.setState({customers: res}))
      .catch(err => console.log(err));
  }

  // componentWillUnmount() {
  //   clearInterval(this.timer);
  // }

  callApi = async () => {
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({ completed: completed >= 100 ? 0 : completed + 1 });
  };

  render() {
    console.log(this.state.customers)
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>가게명</TableCell>
              <TableCell>최소주문</TableCell>
              <TableCell>배달요금</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.customers ?
              this.state.customers.map(c => {
                return <Customer key={c.id} id={c.ID} image={c.STARS} name={c.RESTAURANT_NAME} birthday={c.MINIMUM_COST} gender={c.DELIVERY_FEE}  />
              }) :
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed} />
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(App);