import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import s from './goodsItem.module.less';
import Intent from '../../intent/getList';
/* eslint-disable
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions,
jsx-a11y/anchor-is-valid
*/

@withRouter
class GoodsItem extends Component {
  static propTypes = {
    goodsName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    goodsImgUrl: PropTypes.string.isRequired,
    history: PropTypes.shape({}).isRequired,
  };

  handleClick = () => {
    Intent.getGoodsList();
  };

  render() {
    const { goodsName, price, goodsImgUrl } = this.props;
    console.info(goodsName);
    return (
      <dl className={s.goodsItemContainer}>
        <a onClick={this.handleClick} className={s.goodsItem}>
          <dt>
            <img src={goodsImgUrl} alt={goodsName} />
          </dt>
          <dd>
            <div>{goodsName}</div>
            <div>￥{price}</div>
          </dd>
        </a>
      </dl>
    );
  }
}

export default GoodsItem;
