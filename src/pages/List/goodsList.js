import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import s from './goodsList.module.less';
import GoodsItem from './goodsItem';
import Intent from '../../intent/getList';

class GoodsList extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    Intent.getGoodsList();
  }

  render() {
    const { goodsList } = this.props;
    console.info('list:', this.props);
    return (
      <div className={s.goodsListContainer}>
        <ul className={s.goodsList}>
          {goodsList &&
            goodsList.map(goodsItem => (
              <GoodsItem key={goodsItem.id} {...goodsItem} />
            ))}
        </ul>
      </div>
    );
  }
}

export default GoodsList;
