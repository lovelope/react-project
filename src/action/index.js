import Mock from 'mockjs';

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
export default generateGoods;
