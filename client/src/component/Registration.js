import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import UserInfo from './UserInfo';
import PersonalInfo from './PersonalInfo';
import { Route, Link, Switch } from 'react-router-dom'
import API from './API'


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
});

const steps = ['User info', 'Personal Page info'];




class Registration extends React.Component {
  state = {
    activeStep: 0,
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    password_confirmation: '',
    coins: [],
  };


 updateCoins = (object) =>{
   let coins =this.state.coins
   let coinsfiltered= coins.filter(coin =>coin.id!==object.id)
   coinsfiltered.push(object)
   this.setState({
     coins: coinsfiltered
   })
}

  unique = (arr) =>{
    var u = {}, a = [];
    for(var i = 0, l = arr.length; i < l; ++i){
      if(!u.hasOwnProperty(arr[i])) {
          a.push(arr[i]);
          u[arr[i]] = 1;
      }
    }
    return a;
  }

  getStepContent = (step) => {
   switch (step) {
     case 0:
       return <UserInfo handleChange={this.handleChange} />;
     case 1:
       return <PersonalInfo updateCoins={this.updateCoins}/>;
     default:
       throw new Error('Unknown step');
   }
 }

  handleSubmit = async event => {
    if(this.unique(this.state.coins.map(coin=> coin.coin)).length!==this.state.coins.length){
      let passwordError=document.getElementById("errors")
      passwordError.innerHTML=`<h5 style="color:red"> Please use a single line for every coin. </h5>`
    }else{
    if(this.state.password===this.state.password_confirmation){
      const resp = await API.signup(this.state)
      if(resp.error){
        let passwordError=document.getElementById("errors")
        passwordError.innerHTML=`<h5 style="color:red"> ${resp.error}</h5>`
      }else{
        resp.remember = true
      this.props.signin(resp)
      this.props.history.push('/personalpage')}}
    else {
      let passwordError=document.getElementById("errors")
      passwordError.innerHTML=`<h5 style="color:red"> Password and Password Confirmation need to be the same </h5>`
    }}

  }
  coinHandleChange = event => {
    let coinscopy=this.state.coins
    this.setState({
      coins: {
        [event.target.name]:event.target.value
      }
  })
  }
  handleChange = event =>{
    this.setState({
      [event.target.name]:event.target.value
    })
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const { classes } = this.props;
    const { activeStep } = this.state;

    return (
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
              Registration Form
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? null : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={activeStep === steps.length - 1 ? this.handleSubmit : this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                  </div>
                  <div id="errors"></div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
        <button onClick={()=>console.log(this.state)}>Button </button>
      </React.Fragment>
    );
  }
}

Registration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Registration);
