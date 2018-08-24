import React, { Component } from 'react';
import { DatePicker } from 'antd';
import './index.less';

class Home extends Component {
  // constructor() {
  //   super();
  //   this.handleChange = this.handleChange.bind(this);
  // }

  handleChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    return (
      <div className="page-home">
        <h1>Home</h1>
        <DatePicker onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
