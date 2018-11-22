import React, { Component } from 'react'
import Dropdown from './dropdown'

class TickerForm extends Component {
  constructor() {
    super()

    this.state = {
      options: ['1m','3m','5m','15m','30m','1h','2h','4h','6h','8h','12h','1d','3d','1w','1M']
    }
  }

  render () {
    return (
     <form onSubmit={this.props.loadPrices}>
      <input type="text" name="tickersymbol" placeholder="Ticker Symbol"/>
      <Dropdown options={this.state.options}/>
      <input type="date" name="transdate" placeholder="date of transaction"/>
      <button>Get Prices</button>
     </form>
    )
  }
}

export default TickerForm;