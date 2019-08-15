import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Moment } from 'moment';
import style from './index.module.less';

type Props = AnyObject;
interface State {
  value: Moment | null;
}
class Home extends Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  private handleChange = (date, dateString): void => {
    console.info(date, dateString, { a: 1, b: false });
    this.setState({ value: date });
  };

  public render(): React.ReactElement {
    const { value } = this.state;
    return (
      <div className={style['page-home']}>
        <h1>Home</h1>
        <DatePicker value={value as Moment} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
