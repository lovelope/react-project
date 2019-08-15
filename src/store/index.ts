import Mock from 'mockjs';

/* eslint-disable prettier/prettier */
const delay = (ms: number): Promise<void> =>
  new Promise((resolve): void => {
    setTimeout(resolve, ms);
  });
/* eslint-enable prettier/prettier */

export interface Goods {
  id: string;
  goodsName: string;
  price: number;
  goodsImgUrl: string;
}

function generateSingleGoods(): Goods {
  const goodsName = Mock.Random.ctitle();
  const data = Mock.mock({
    id: Mock.Random.guid(),
    goodsName,
    price: Mock.Random.float(0, 1000, 0, 2),
    goodsImgUrl: Mock.Random.dataImage('200x120', goodsName),
  });
  return data;
}

async function generateGoods(n = 10): Promise<Goods[]> {
  await delay(1000);
  if (typeof n !== 'number' || n <= 0) {
    return [];
  }
  const arr: Goods[] = [];
  for (let i = 0; i < n; i += 1) {
    arr.push(generateSingleGoods());
  }
  return arr;
}

export interface GoodsStore {
  goodsList: Goods[];
  total: number;
  getGoodsList: () => Promise<void>;
}

export default function createStore(): GoodsStore {
  return {
    goodsList: [] as Goods[],

    get total(): number {
      return this.goodsList.length;
    },

    async getGoodsList(): Promise<void> {
      const newGoodsList = await generateGoods();
      this.goodsList = [...this.goodsList, ...newGoodsList];
    },
  };
}
