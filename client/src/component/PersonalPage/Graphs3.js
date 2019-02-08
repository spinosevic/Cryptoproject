import React from 'react'
import { Chart } from "react-google-charts";
import PersonalPageCss from './PersonalPage.css'


class Graphs3 extends React.Component{

  render(){

    let parsedDataforLineChart=this.props.total.map(x=>{
      return x.map(y=>{
        return (!Number(y) ?
        y :
        Number(y))
      })
    })


    return(<>
      <Chart
        width={'100%'}
        height={'100%'}
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
          </>

    )
  }


}
export default Graphs3
