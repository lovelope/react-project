import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'antd';
import s from './goodsList.module.less';
import GoodsItem from './goodsItem';

@inject('store')
@observer
class GoodsList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      goodsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
      getGoodsList: PropTypes.func.isRequired,
    }).isRequired,
  };

  // 加载状态
  @observable
  loading = false;

  handleClickItem = async () => {
    const {
      store: { getGoodsList },
    } = this.props;
    this.loading = true;
    await getGoodsList();
    this.loading = false;
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

        <Button
          type="primary"
          className={s.btn}
          loading={this.loading}
          onClick={this.handleClickItem}
        >
          获取新数据
        </Button>
      </div>
    );
  }
}

export default GoodsList;
