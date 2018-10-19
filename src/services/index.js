import request from '@/utils/request';

export function getGoodsList({ page }) {
  return request('/api/goods/list', { body: { page } });
}

export function getGoods({ goodsId }) {
  return request('/api/goods/detail', { body: { goodsId } });
}
