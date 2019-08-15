/* eslint-disable import/prefer-default-export */
import { ColumnProps } from 'antd/es/table';

interface GoodsType {
  id: string;
  goodsName: string;
  goodsImgUrl: string;
  price: number;
}

export const getColumns = ({ renderImg }): ColumnProps<GoodsType>[] => [
  {
    title: '商品id',
    dataIndex: 'id',
    key: 'id',
    width: 100,
  },
  {
    title: '商品图片',
    dataIndex: 'goodsImgUrl',
    key: 'goodsImgUrl',
    width: 100,
    render: renderImg,
  },
  {
    title: '商品名称',
    dataIndex: 'goodsName',
    key: 'goodsName',
    width: 300,
  },
  {
    title: '价格',
    dataIndex: 'price',
    key: 'price',
    width: 100,
  },
];
