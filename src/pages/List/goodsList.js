import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { inject, observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button, Table } from 'antd';
import s from './goodsList.module.less';
// import GoodsItem from './goodsItem';
import { getColumns } from './const.ts';

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

    const columns = getColumns({
      renderImg: text => <img src={text} alt="" />,
    });
    return (
      <div className={s.goodsListContainer}>
        <Table columns={columns} dataSource={goodsList} rowKey="id" />

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
