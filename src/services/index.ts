import request from '@/utils/request.ts';

export function getGoodsList({ page }) {
  // @ts-ignore
  return request('/api/goods/list', { body: { page } });
}

export function getGoods({ goodsId }) {
  // @ts-ignore
  return request('/api/goods/detail', { body: { goodsId } });
}
