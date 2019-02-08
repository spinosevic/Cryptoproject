import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Route, Link, Switch } from 'react-router-dom'
import API from '../API'
import MediaCard from './MediaCard'
import Graphs1 from './Graphs1'
import Graphs2 from './Graphs2'
import Graphs3 from './Graphs3'
import Notes from './Notes'

import PersonalPageCss from './PersonalPage.css'

import ReactVirtualizedTable from './ReactVirtualizedTable'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

class PersonalPage extends React.Component{

  state={
    coins: [],
    news: [],
    coins_current_values: [],
    last_access: '',
    created: '',
    total: [],
    breakevenpoint: 0,
    single_coin_graph: [],
    showing: 'Total'
  }

  componentDidMount () {
    if(!this.props.username){
      this.props.history.push('/')
    }
     this.stateCoin()
     this.stateNews()
  }

  breakevenpoint = ()=>{
    let breakevenpoint=0
    this.state.coins.map(coin=>{
      breakevenpoint+=coin.amount*coin.price_per_unit
    })
    this.setState({
      breakevenpoint: breakevenpoint
    })
  }
  get30DaysDetail = (name)=>{
    let selectedCoin= this.state.coins.filter(x=>x.coin==name.toLowerCase())[0]
    API.last30days(selectedCoin)
    .then(total=>{
      let breakevenpoint= selectedCoin.amount*selectedCoin.price_per_unit
      let graph=[['Day',`${name} Total`,'Break-even-point']]
      for (let i = 0; i < total.length; i++){
      let day= new Date()
      day.setDate(day.getDate() - total.length)
      day.setDate(day.getDate() + i)
      let selectedDay = API.changeDataFormatfromDateToEU(day)
      graph.push([selectedDay, Number(total[i]), Number(breakevenpoint)])
    }
    this.setState({
      total: graph,
      showing: name
    })
  })
  }
  getHistory = () =>{
    let now =new Date
    let today= `${("0" + now.getDate()).slice(-2)}-${("0" + (now.getMonth() + 1)).slice(-2)}-${now.getFullYear()}`
    API.getCoinsCurrentValue(this.state.coins.map(coin=>coin.coin))
    .then(prices=>this.setState({
      coins_current_values: prices
    }))
    if (today===this.state.created){
      API.firstCoinHistory(this.state)
      .then((total)=>{
        let breakevenpoint =0
        this.state.coins.map(coin=>{
          breakevenpoint+=coin.amount*coin.price_per_unit
        })
        let values = [today, Number(total[0]), Number(breakevenpoint)]
        let oldValues = this.state.total
        let newValues=oldValues.slice(0,1)
        newValues.push(values)
        this.setState({
          total: newValues
        })
        API.updateTotal(newValues)
      })
    }else if(today===this.state.last_access){

    }else{
      let oldState = this.state.total
      let newState
      let timeDiff = Math.abs(new Date(this.changeDateFormatToUs(today)).getTime() - new Date(this.changeDateFormatToUs(this.state.last_access)).getTime());
      let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      let breakevenpoint =0
      this.state.coins.map(coin=>{
        breakevenpoint+=coin.amount*coin.price_per_unit
      })
      API.getAllCoinsHistory(this.state,diffDays)
      .then((total)=>{
        let graphArray=[]
        for (let i = 0; i < total.length; i+=this.state.coins.length){
          let dailyTotal=0
          let selectedDay
          for (let j = 0; j < this.state.coins.length; j++){
            let day = new Date(API.changeDateFormatToUS(this.state.last_access))
            day.setDate(day.getDate() + (1+Math.floor(i/this.state.coins.length)))
            selectedDay = API.changeDataFormatfromDateToEU(day)
            dailyTotal+=total[i+j]

          }
          graphArray.push([selectedDay, Number(dailyTotal), Number(breakevenpoint)])
        }
        newState= oldState.concat(graphArray)

        this.setState({
          total: newState
        })
        API.updateTotal(newState,this.props.username)
      })}
    }

    showTotal = ()=>{
    API.getTotal2()
    .then((total)=>{
      this.setState({
      total: total.total
    },console.log(this.state.total))})
    }


  changeDateFormatToUs = (string) =>{
    return `${string.slice(3,5)}/${string.slice(0,2)}/${string.slice(6)}`
  }

   changeDataFormatfromDateToEU=(date)=>{
    return `${("0" + date.getDate()).slice(-2)}-${("0" + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
  }

  stateCoin = () =>{
  API.getCoins()
  .then(resp=>this.setState({
    coins: resp.coins,
    last_access: resp.last_access,
    total: resp.total,
    created: resp.created
  },()=>{
    this.breakevenpoint()
    this.getHistory()
    }))}

  stateNews = () =>{
    API.handleNews()
    .then(news=>{
      this.setState({
      news: news.articles
      })
    })
  }

  render(){
    return(
      <div className="PersonalPage">
        <div className="NavigationBar">
          <div className="ButtonArea buttons">
            <a onClick={()=>{this.props.signout()}} href="#" className="btn btn-sm animated-button victoria-two nav_btn">Sign Out</a>
             <Link to='/edit' onClick={()=>{this.props.coins(this.state.coins)}} className="btn btn-sm animated-button victoria-two nav_btn">Edit Coins</Link>
             <Link to='/bot' className="btn btn-sm animated-button victoria-two nav_btn" >Create Bot</Link>
          </div>
          <div className="LogoArea">
            <h1>Welcome {`${this.props.username}`}</h1>
          </div>
        </div>
        <div className="ContentPersonalPage">
          <div className="LeftAreaContent">
            <div className="ChartBlock">
            <ReactVirtualizedTable graph={this.get30DaysDetail} showTotal={this.showTotal} total={this.state.total} state={this.state}/>

            </div>
            <div className="ChartBlock">
            <div className="Notes">
              <Notes />
            </div>
            </div>
          </div>
          <div className="RightAreaContent">
          <div className="ChartBlock Chart1-2">

          <div className="Chart1">
          <Graphs1 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
          </div>
          <div className="Chart2">
          <Graphs2 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
          </div>
          </div>
          <div className="ChartBlock">
          <div className="Chart3">
          <Graphs3 coins={this.state.coins}  prices={this.state.coins_current_values} state={this.state} total={this.state.total} />
          </div>
          </div>

          </div>
        </div>
        <div className="NewsArea grid-5 center">
        {this.state.news.slice(0,5).map(singlenews=><div > <MediaCard singlenews={singlenews}/></div>)}

        </div>
      </div>

    )
  }
}

export default PersonalPage
