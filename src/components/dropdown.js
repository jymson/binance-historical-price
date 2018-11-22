import React, { Component } from 'react'

class Dropdown extends Component {
  

  render () {
    const {options} = this.props
    let num = options.length

    return (
      <select>
        {options.map((opt) => {
          num -= 1
          return <option value="{opt}" key={num}>{opt}</option>
        })}
      </select>
    )
  }
}

export default Dropdown;