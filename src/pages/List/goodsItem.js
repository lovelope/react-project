import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'redux-react-hook';
import s from './goodsItem.module.less';
import generateGoods from '../../action';
import { GOODS_LIST } from '../../action/type';
/* eslint-disable
jsx-a11y/click-events-have-key-events,
jsx-a11y/no-static-element-interactions,
jsx-a11y/anchor-is-valid
*/

const GoodsItem = ({ goodsName, price, goodsImgUrl }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const res = generateGoods();
    dispatch({
      type: GOODS_LIST,
      payload: [...res],
    });
  };
  return (
    <dl className={s.goodsItemContainer}>
      <a onClick={handleClick} className={s.goodsItem}>
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
};
GoodsItem.propTypes = {
  goodsName: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  goodsImgUrl: PropTypes.string.isRequired,
};
export default GoodsItem;
