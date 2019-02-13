import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import Form from './Form'
import BotParameters from './BotParameters'
import API from '../API'
import BotCss from './BotCss.css'


import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
});

class Bot extends React.Component{
  state={
    information_submitted: false,
    coins_balances:[],
    bot_created: false
  }


  componentDidMount () {
    if(!this.props.username){
      this.props.history.push('/')
    }
    this.getKeys()
    this.getBots()
    }

    getKeys= () =>{
      API.getKeys2()
      .then(x=>{
        console.log(x)
        if(!!x.api_key!==false && !!x.api_secret!==false){
          this.setState({
            information_submitted: true
          },this.getCoinsfromBalances())
        }
      })
    }

    getBots= () =>{
      API.getBots2()
      .then(bots=>{
        console.log(bots.bots!=='empty')
        if(bots.bots!=='empty'){
          if(bots.bots[0].active){
            this.setState({
              bot_created: true
            })
          }
        }
      })
    }

    getCoinsfromBalances = () =>{
      API.getBalances2()
      .then(x=>{
        if(x.results!==null){
        let coinsArray=x.results.filter(y=>y.Balance!==0)
        this.setState({
          coins_balances: coinsArray
        })
      }})
    }


    firstSubmit = () =>{
      this.setState({
        information_submitted:true
      })
    }

    handleSecondSubmit = (bot) =>{
      API.buildBot2(bot)
      .then((x)=>{
        this.setState({
          bot_created: true
        })
      })
    }

    editButton = () =>{
      this.setState({
        information_submitted:false
      })
    }

    stopTheBot =()=> {
      API.stopTheBot2()
      .then(x=>{
        this.setState({
          bot_created: false
        })
      })
    }

  render(){
    const { classes } = this.props;

    return(
      <>
      <div className="ContentBot">
      <div className="MarginContent">
      <div className="NavBarBot">
      <div className="Button">
        <Link className="Back" to='/personalpage'><h1>Go Back</h1></Link>
      </div>
      <div className="Title">
        <h1> Create your bot is easy!</h1>
      </div>
      </div>
      <div className="What-Image">
      <div className="WhatIsIt">
        <h2>What is it?</h2>
        <p>A Cryptobot is a program that interact with the Bittrex exchange market to  perform automatic actions based on algorithm and strategy that you will decide.<br/>
         Volatility is defined as the difference between the daily maximum and minimum value, these fluctuations can represent a good opportunity for traders even in periods where the daily average values seem to be almost constant.The average daily volatility of bitcoin is almost 5%. <br/>
          To perform this kind of trading it is required a lot of commitment and time to follow the markets and perform operations at the right second! CryptoBot can perform these operations for you. Set up a bot is easy!</p>
        <ul>
          <li>Activate the api key and api secret on Bittrex settings</li>
          <li>Allow interaction with 127.0.1 IP in the IP Whitelist</li>
          <li>Submit the informations here, select the coins and strategy </li>
          <li>Done!</li>
        </ul>
      </div>
      <div className="ImageBot">
      <i className="fas fa-robot fa-9x" />

      </div>
      </div>
      <div className="instr_bot">

        <div className="BotArea">
        {this.state.information_submitted?
          (this.state.bot_created?
            <><h2>Bot Created!</h2>
            <Button onClick={()=>{this.stopTheBot()}} variant="contained" color="primary" className={classes.button}>
                  Stop the bot
            </Button>
            </>:
            <>

          <Button onClick={()=>{this.editButton()}} variant="contained" color="primary" className={classes.button}>
                Edit API info
          </Button>
          <BotParameters handleSecondSubmit={this.handleSecondSubmit} coins={this.state.coins_balances}/>


          </>):
          <div className="edit">
          <Form handleSubmit={this.firstSubmit}  handleSecondSubmit={this.handleSecondSubmit} />
          </div>

}      </div>
<div className="Instructions">
  <h2> Instructions </h2>
  <p>Select a coin in your Bittrex wallet in the dropdown menù.<br/> The next field is the value in BTC of a single coin around that will activate the bot.<br/> Target sell/buy field percentage is the neighborhood extensionfor the bot activity. <br/>
  The Balance ratio will calculate how much of that currency balance in your Bittrex wallet you want the bot to handle.<br/>
  For Example:<br/>
  Let's assume you want the bot to handle your XRP coins.<br/>
  You want the bot to sell at every moment during the day the price goes 2% over the value of 0.00008530 BTC, and buy them again when their cost will decrease 2% from that value.<br/>
  And repeat the same actions every time these conditions will be met.<br />
  Your balance in XPR is 5000, and you want just half of this be handled by this strategy.<br/>
   For the following case, the form should be filled in this way:<br/><br/>
   Coin: XRP, Middle Value: 0.00008530,  Buy/Sell Percentage: 2, Balance Ratio: 0.5</p>
  </div>
</div>
</div>
      </div>
      </>)
  }
}

Bot.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Bot)
