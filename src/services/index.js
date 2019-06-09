import request from '@/utils/request.ts';

export function getGoodsList({ page }) {
  return request('/api/goods/list', { body: { page } });
}

export function getGoods({ goodsId }) {
  return request('/api/goods/detail', { body: { goodsId } });
}
