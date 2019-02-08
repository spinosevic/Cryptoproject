import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import MenuItemsEdit from './MenuItemsEdit'
import API from '../API'


const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class Edit extends React.Component  {
  state={
    allcoinsoption: []
  }

  componentDidMount () {
    if(!this.props.username){
      this.props.history.push('/')
    }
    API.getCoinSymbols()
    .then(json=> this.setState({
      allcoinsoption: json
    },()=>{console.log(this.state)}))
  }

  addlines = () =>{
    let lines= this.state.lines
    this.setState({
      lines: lines+1
    })
  }
  removelines = () =>{
    let lines= this.state.lines
    if(lines>1){
      this.setState({
        lines: lines-1
      })
    }
  }

   createLines = () => {
     let lines=[]
     for( let i = 0; i < this.props.coins.length; i++){
       lines.push(<MenuItemsEdit removeEditLine={this.props.removeEditLine} changeCoinsArray={this.props.changeCoinsArray} coinsoptions={this.state.allcoinsoption} coin={this.props.coins[i]} key={i} id={i}  updateCoins={this.props.updateCoins}/>)
     }
     return lines
   }

  render(){
    const { classes } = this.props;
  return (<>
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Crypto Bot
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Edit your coins
          </Typography>
          <React.Fragment>
              <React.Fragment>
              <React.Fragment>
                <Typography variant="h6" gutterBottom>
                </Typography>
                <Fab onClick={()=>{this.props.addEditLine()}} color="primary" aria-label="Add" size='small' >
                  <AddIcon />
                </Fab>
                {this.createLines()}
              </React.Fragment>
                <div className={classes.buttons}>

                    <Button onClick={()=>{this.props.history.push('/personalpage')}} className={classes.button}>
                      Back
                    </Button>

                  <Button onClick={()=>{
                    API.updateCoins2(this.props.coins)
                    this.props.history.push('/personalpage')
                  }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                  Submit
                  </Button>
                </div>
                <div id="errors"></div>
              </React.Fragment>
          </React.Fragment>
        </Paper>
      </main>
    </React.Fragment>
    </>
  );
}
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Edit);
