import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import HomePage from './component/HomePage/HomePage'
import SignIn from './component/SignIn/SignIn'
import SignUp from './component/SignUp/SignUp'
import PersonalPage from './component/PersonalPage/PersonalPage'
import API from './component/API'
import Edit from './component/Edit/Edit'
import Bot from './component/Bot/Bot'




class App extends Component {
  state={
    username: '',
    coins: []
  }
  signin = user => {
     if(user.remember){
      localStorage.setItem('token',user.token)
     }
    this.setState({
      username: user.username
    })
  }

  signout = () => {
    localStorage.setItem('token','')
    this.setState({
      username: ''
    })
  }

  coins = (coinsArray) =>{
    this.setState({
      coins: coinsArray
    })
  }

  addEditLine =() =>{
    let coins=this.state.coins
    let id=coins[coins.length-1].id
    coins.push({coin: '', amount: '',price_per_unit: '',id: id+1})
    this.setState({
      coins: coins
    })
  }

  removeEditLine =(selected) =>{
    let coins=this.state.coins
    let newCoins=coins.filter(x=>x.coin!==selected)
    let newState=newCoins.sort(function(a, b) {
      return a.id - b.id;
    })
    this.setState({
      coins: newCoins
    })
  }

  changeCoinsArray=(selected)=>{
    let otherCoins=this.state.coins.filter(coin=>coin.id!==selected.id)
    otherCoins.push(selected)
    let newState=otherCoins.sort(function(a, b) {
      return a.id - b.id;
    })
    this.setState({
      coins: newState
    })

  }


  componentDidMount () {
    if(localStorage.token){
      API.validate()
            .then(data => {
              if (data.error) {
                this.signout()
              } else {
                this.signin(data)
                this.props.history.push('/personalpage')
              }
            })
      }else{
        this.props.history.push('/')

      }
  }


  render() {
    return (
      <div className="App">
      <Switch>
        <Route exact path='/' component={props=><HomePage username={this.state.username} signout={this.signout} />} />
        <Route path='/signin' component={props=><SignIn {...props} signin={this.signin} />} />
        <Route path='/signup' component={props=><SignUp {...props} signin={this.signin} />} />
        <Route path='/personalpage' component={props=><PersonalPage {...props} coins={this.coins} news={this.state.news} signin={this.signin} signout={this.signout} username={this.state.username} />} />
        <Route path='/edit' component={props=><Edit {...props} changeCoinsArray={this.changeCoinsArray} removeEditLine={this.removeEditLine} addEditLine={this.addEditLine} coins={this.state.coins} username={this.state.username} />} />
        <Route exact path='/bot' component={props=><Bot {...props}  username={this.state.username} />} />
        <Route component={() => <h1>404 - PAGE NOT FOUND!</h1>} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App)
