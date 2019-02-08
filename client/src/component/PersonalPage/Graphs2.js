import React from 'react'
import { Chart } from "react-google-charts";
import PersonalPageCss from './PersonalPage.css'


class Graphs2 extends React.Component{

  render(){

    let object=this.props.prices
    let prices=[['Coin', 'Value']]
    for(let key in object){
      let amount= 0
      this.props.coins.map(coin=>(key===coin.coin?amount=coin.amount:null))
      prices.push([key, object[key].eur*amount])
    }
    return(<>
      <div className="Chart2">
      <Chart
          width={'100%'}
          height={'100%'}
          chartType="PieChart"
          loader={<div>Loading Chart</div>}
          data={prices}
          options={{
            title: 'Current Investment Value in EUR',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
        </div>
          </>

    )
  }


}
export default Graphs2
