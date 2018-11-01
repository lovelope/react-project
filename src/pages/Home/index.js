import React, { Component } from 'react';
import { DatePicker } from 'antd';
import style from './index.module.less';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date, dateString) {
    console.info(date, dateString, Object.assign({}, { a: 1 }, { b: false }));
    this.setState({ value: date });
  }

  render() {
    const { value } = this.state;
    return (
      <div className={style['page-home']}>
        <h1>Home</h1>
        <DatePicker value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
