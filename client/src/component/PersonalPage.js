import React from 'react'
import { Route, Link, Switch } from 'react-router-dom'
import API from './API'
import MediaCard from './MediaCard'
import Graphs from './Graphs'

class PersonalPage extends React.Component{

  state={
    coins: [],
    news: [],
    coins_current_values: []
  }

  componentDidMount () {
    if(!this.props.username){
      this.props.history.push('/')
    }
     this.stateCoin()
     this.stateNews()
  }

  stateCoin = () =>{
  API.getCoins()
  .then(coins=>this.setState({
    coins: coins
  },()=>this.getDailyValue()))}

  stateNews = () =>{
    API.newsAPI()
    API.getNews()
    .then(news=>{
      this.setState({
      news: news.results
      })
    })
  }

  getDailyValue = () =>{
    let array=[]
    console.log("here")
    this.state.coins.map(coin=> {
      console.log(coin)
      console.log("coin")
      API.getValue(coin.coin.toLowerCase())
      .then(json=> {
        let newState=this.state.coins_current_values
        newState.push([coin.coin, json.market_data.current_price.eur])
        return this.setState({
          coins_current_values: newState
        })
      })
    })
  }

  render(){
    return(
      <>
      <button onClick={()=>console.log(this.state)}> Button </button>
      <div className="grid-1">
      <h1>Welcome {`${this.props.username}`}</h1>
      </div>
      <header className="personalcontent">
        <div className="grid-3bis">
          <div style={{zIndex:1}} className="col-md-3 col-sm-3 col-xs-6 ">
           <a onClick={()=>{this.props.signout()}} href="#" class="btn btn-sm animated-button victoria-two">Sign Out</a>
          </div>
          <div style={{zIndex:1}} className="col-md-3 col-sm-3 col-xs-6 ">
           <Link style={{ textDecoration: 'none' }} to='/'><a href="#" class="btn btn-sm animated-button victoria-two">Edit Coins</a></Link>
          </div>
          <div style={{zIndex:1}} className="col-md-3 col-sm-3 col-xs-6 ">
           <Link style={{ textDecoration: 'none' }} to='/'><a href="#" class="btn btn-sm animated-button victoria-two">Create Bot</a></Link>
          </div>
        </div>
        <div className="content">
          <div className="title">
          </div>
          <div className="text">
            <Graphs coins={this.state.coins}/>
          </div>
        </div>
        </header>
        <section className="services">

        <div className="grid-5 center">

        {this.state.news.slice(0,5).map(singlenews=><div style={{zIndex:2}}> <MediaCard singlenews={singlenews}/></div>)}
        </div>
        </section>
      </>
    )
  }
}

export default PersonalPage
