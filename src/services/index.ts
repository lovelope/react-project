import request, { ResponseSchema } from '@/utils/request';
import { Goods } from '@/store';

interface GoodsList {
  list: Goods[];
}
export function getGoodsList({ page }): Promise<ResponseSchema<GoodsList>> {
  return request.get<ResponseSchema<GoodsList>>('/api/goods/list', {
    body: { page },
  });
}

export function getGoods({ goodsId }): Promise<ResponseSchema<Goods>> {
  return request.get<ResponseSchema<Goods>>('/api/goods/detail', {
    body: { goodsId },
  });
}
