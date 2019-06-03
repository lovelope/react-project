import { observable, computed, action, runInAction } from 'mobx';
import Mock from 'mockjs';

const delay = (ms: number): Promise<undefined> =>
  new Promise(
    (resolve): void => {
      setTimeout(resolve, ms);
    }
  );

interface Goods {
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

export default class Store {
  public constructor() {
    this.getGoodsList();
  }

  @observable.ref
  public goodsList: Goods[] = [];

  @computed
  public get total(): number {
    return this.goodsList.length;
  }

  // 需要使用箭头函数方法，否则取不到 this
  @action
  public getGoodsList = async (): Promise<void> => {
    const newGoodsList = await generateGoods();
    runInAction(
      (): void => {
        this.goodsList = [...this.goodsList, ...newGoodsList];
      }
    );
  };
}
