import React, { Component } from 'react';
import { DatePicker } from 'antd';
import { Dayjs } from 'dayjs';
import pkg from '@/assets/images/pkg.png';
import style from './index.module.less';

type Props = AnyObject;
interface State {
  value: Dayjs | null;
}
class Home extends Component<Props, State> {
  public constructor(props: Readonly<Props>) {
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
        <img src={pkg} alt="pkg" />
        <DatePicker value={value as any} onChange={this.handleChange} />
      </div>
    );
  }
}

export default Home;
