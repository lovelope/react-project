import React from 'react';
// @ts-ignore
import { Goods } from '@/store/index.ts';
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
