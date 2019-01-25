import React from 'react'
import { Chart } from "react-google-charts";

class Graphs extends React.Component{

  render(){
    let coins_array = this.props.coins.map(coin=>[coin.coin,coin.amount*coin.price_per_unit])
    coins_array.splice(0,0,['Coin', 'Value'])
    return(
      <Chart
          width={'500px'}
          height={'300px'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={coins_array}
          options={{
            title: 'Initial Investment Diversification',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
    )
  }


}
export default Graphs
