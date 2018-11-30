import React, { useEffect } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import s from './goodsList.module.less';
import GoodsItem from './goodsItem';
import generateGoods from '../../action';
import { GOODS_LIST } from '../../action/type';
/* eslint-disable no-unused-expressions */
const mapState = ({ list }) => ({
  goodsList: list.goodsList,
});
const GoodsList = () => {
  const { goodsList } = useMappedState(mapState);

  const dispatch = useDispatch();
  useEffect(
    () => {
      const res = generateGoods();
      goodsList.length === 1 &&
        dispatch({
          type: GOODS_LIST,
          payload: [...res],
        });
    },
    [goodsList]
  );
  return (
    <div className={s.goodsListContainer}>
      <ul className={s.goodsList}>
        {goodsList.map(goodsItem => (
          <GoodsItem key={goodsItem.id} {...goodsItem} />
        ))}
      </ul>
    </div>
  );
};
export default GoodsList;
