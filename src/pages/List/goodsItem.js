import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import s from './goodsItem.module.less';

@withRouter
class GoodsItem extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    goodsName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    goodsImgUrl: PropTypes.string.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  render() {
    const { id, goodsName, price, goodsImgUrl } = this.props;
    return (
      <li className={s.goodsItemContainer}>
        <a href={`/goodsDetail?id=${id}`} className={s.goodsItem}>
          <img src={goodsImgUrl} alt={goodsName} />
          {goodsName} : ￥{price}
        </a>
      </li>
    );
  }
}

export default GoodsItem;
