import React from 'react'
import { Chart } from "react-google-charts";
import PersonalPageCss from './PersonalPage.css'


class Graphs1 extends React.Component{

  render(){
    let coins_array = this.props.coins.map(coin=>[coin.coin,coin.amount*coin.price_per_unit])
    coins_array.splice(0,0,['Coin', 'Value'])
    return(
      <>
        <div className="Chart1">
          <Chart
              width={'100%'}
              height={'100%'}
              chartType="PieChart"
              loader={<div>Loading Chart</div>}
              data={coins_array}
              options={{
                title: 'Initial Investment Diversification in EUR',
              }}
              rootProps={{ 'data-testid': '1' }}
            />
        </div>
        </>

    )
  }


}
export default Graphs1
