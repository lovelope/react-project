import request from '@/utils/request.ts';

export function getGoodsList({ page }): Promise<AnyObject> {
  // @ts-ignore
  return request('/api/goods/list', { body: { page } });
}

export function getGoods({ goodsId }): Promise<AnyObject> {
  // @ts-ignore
  return request('/api/goods/detail', { body: { goodsId } });
}
