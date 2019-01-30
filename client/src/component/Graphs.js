import React from 'react'
import { Chart } from "react-google-charts";

class Graphs extends React.Component{

  render(){
    let coins_array = this.props.coins.map(coin=>[coin.coin,coin.amount*coin.price_per_unit])
    coins_array.splice(0,0,['Coin', 'Value'])
    let parsedDataforLineChart=this.props.total.map(x=>{
      return x.map(y=>{
        return (!Number(y) ?
        y :
        Number(y))
      })
    })
    let object=this.props.prices
    let prices=[['Coin', 'Value']]
    for(let key in object){
      let amount= 0
      this.props.coins.map(coin=>(key===coin.coin?amount=coin.amount:null))
      prices.push([key, object[key].eur*amount])
    }
    return(
      <div>
      <Chart
          width={'400px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={coins_array}
          options={{
            title: 'Initial Investment Diversification in EUR',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={prices}
            options={{
              title: 'Current Investment Value in EUR',
            }}
            rootProps={{ 'data-testid': '1' }}
          />
        <br />
        <button onClick={()=>{this.props.showTotal()}}> Total </button>
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="LineChart"
          loader={<div>Loading Chart</div>}
          data={parsedDataforLineChart}
          options={{
            hAxis: {
              title: 'Day',
            },
            vAxis: {
              title: `${this.props.state.showing} in EUR`,
            },
            series: {
              1: { curveType: 'function' },
            },
          }}
          rootProps={{ 'data-testid': '2' }}
        />
        </div>
    )
  }


}
export default Graphs
