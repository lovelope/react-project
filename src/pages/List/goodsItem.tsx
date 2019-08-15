import React from 'react';
import { Goods } from '@/store';
import s from './goodsItem.module.less';

type Props = Goods;
const GoodsItem = ({
  id,
  goodsName,
  goodsImgUrl,
  price,
}: Props): React.ReactElement => (
  <li className={s.goodsItemContainer}>
    <a href={`/goodsDetail?id=${id}`} className={s.goodsItem}>
      <img src={goodsImgUrl} alt={goodsName} />
      {goodsName} : ￥{price}
    </a>
  </li>
);

export default GoodsItem;
