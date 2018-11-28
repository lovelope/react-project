import Mock from 'mockjs';
import { GOODS_LIST } from './type';
/* eslint-disable import/prefer-default-export */
// 模拟数据方法
function generateSingleGoods() {
  const goodsName = Mock.Random.title();
  const data = Mock.mock({
    id: Mock.Random.guid(),
    goodsName,
    price: Mock.Random.float(0, 1000, 0, 2),
    goodsImgUrl: Mock.Random.dataImage('200x120', goodsName),
  });
  return data;
}

function generateGoods(n = 10) {
  if (typeof n !== 'number' || n <= 0) {
    return [];
  }
  const arr = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(generateSingleGoods());
  }
  return arr;
}
//
// 获取商品列表
export function getGoodsList() {
  return async dispatch => {
    console.info('22222222');
    try {
      const res = await generateGoods();
      console.info(res);
      dispatch({
        type: GOODS_LIST,
        payload: [...res],
      });
    } catch (error) {
      console.info(error);
    }
  };
}
