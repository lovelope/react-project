import React, { Component } from 'react';
import { DatePicker } from 'antd';
import './index.less';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date, dateString) {
    console.info(date, dateString);
    this.setState({ value: date });
  }

  render() {
    const { value } = this.state;
    return (
      <div className="page-home">
        <h1>Home</h1>
        <DatePicker value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
