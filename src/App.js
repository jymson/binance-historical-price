import React, { Component } from 'react'
import axios from 'axios'
import TickerForm from './components/TickerForm'
import './App.css'


/*
[
  [
    1499040000000,      // Open time 0
    "0.01634790",       // Open 1
    "0.80000000",       // High 2
    "0.01575800",       // Low 3
    "0.01577100",       // Close 4
    "148976.11427815",  // Volume 5
    1499644799999,      // Close time 6
    "2434.19055334",    // Quote asset volume 7
    308,                // Number of trades 8
    "1756.87402397",    // Taker buy base asset volume 9
    "28.46694368",      // Taker buy quote asset volume 10
    "17928899.62484339" // Ignore.
  ]
]
*/

class App extends Component {
  constructor () {
    super();

    this.state = {
      ticker: 'ICXUSDT',
      interval: '30m',
      startTime: 1541801717000,
      exchangePairs: [],
      date: new Date().toLocaleString()
    }

    // this.handleClick = this.handleClick.bind(this)
    // this.grabTickers();
  }

  getTicker(dataFromTickerInput) {

  }

  grabTickers() {
    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.binance.com/api/v1/exchangeInfo`)
    .then(res => this.parseTickerData(res))
  }

  getPrices(e) {
    e.preventDefault()
    const { tickersymbol: ticker, transdate: transactionDate, candleInterval: candleInt } = e.target.elements

    axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://api.binance.com/api/v1/klines?symbol=${ticker}&interval=${transactionDate}&startTime=${candleInt}`)
    .then(res => this.parseAPIData(res))
  }

  parseAPIData (res) {
    let dataObj = {};
    let candleInfo = JSON.parse(res.request.response)[0];
    
    console.log(dataObj);
    this.setState({ 
      open_time: candleInfo[0],
      closing_price: candleInfo[4]
    })
  }

  parseTickerData (res) {
    let apiRes = JSON.parse(res.request.response).symbols.map(sym => sym.symbol);

    this.setState({ exchangePairs: apiRes });
  }

  render () {
    return (
      <div className='button__container'>
        <TickerForm loadPrices={this.getPrices}/>
        <p>{this.state.closing_price}</p>
      </div>
    )
  }
}
export default App