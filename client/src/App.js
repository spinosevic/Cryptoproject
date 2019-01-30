import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import HomePage from './component/HomePage'
import SignIn from './component/SignIn'
import Registration from './component/Registration'
import PersonalPage from './component/PersonalPage'
import API from './component/API'
import Edit from './component/Edit'




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
        <Route path='/signin' component={props=><SignIn />}/>
        <Route path='/login' component={props=><SignIn {...props} signin={this.signin} />} />
        <Route path='/signup' component={props=><Registration {...props} signin={this.signin} />} />
        <Route path='/personalpage' component={props=><PersonalPage {...props} news={this.state.news} signin={this.signin} signout={this.signout} username={this.state.username} />} />
        <Route component={() => <h1>404 - PAGE NOT FOUND!</h1>} />
      </Switch>
      </div>
    );
  }
}

export default withRouter(App)
