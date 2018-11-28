import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import s from './goodsList.module.less';
import GoodsItem from './goodsItem';
import { getGoodsList } from '../../action';

@connect(
  state => state.list,
  { getGoodsList }
)
class GoodsList extends Component {
  static propTypes = {
    getGoodsList: PropTypes.func,
    goodsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  static defaultProps = {
    getGoodsList: () => {},
  };

  componentDidMount() {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.getGoodsList();
    console.info(this.props);
  }

  render() {
    const { goodsList } = this.props;
    console.info('list:', this.props);
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
