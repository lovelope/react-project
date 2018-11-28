import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import s from './goodsItem.module.less';
/* eslint-disable
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions,
jsx-a11y/anchor-is-valid
*/
import { getGoodsList } from '../../action';

@withRouter
@connect(
  state => state.list,
  {
    getGoodsList,
  }
)
class GoodsItem extends Component {
  static propTypes = {
    goodsName: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    goodsImgUrl: PropTypes.string.isRequired,
    history: PropTypes.shape({}).isRequired,
    getGoodsList: PropTypes.func,
  };

  static defaultProps = {
    getGoodsList: () => {},
  };

  handleClick = () => {
    const { getGoodsList: getList } = this.props;
    getList();
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
