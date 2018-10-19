import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import s from './goodsList.module.less';
import GoodsItem from './goodsItem';

@inject('store')
@observer
class GoodsList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      goodsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    }).isRequired,
  };

  render() {
    const {
      store: { goodsList },
    } = this.props;
    return (
      <div className={s.goodsListContainer}>
        <ul className={s.goodsList}>
          {goodsList.map(goodsItem => (
            <GoodsItem key={goodsItem.id} {...goodsItem} />
          ))}
        </ul>
      </div>
    );
  }
}

export default GoodsList;
