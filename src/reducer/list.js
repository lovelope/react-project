import { GOODS_LIST } from '../action/type';

const initState = {
  goodsList: [
    {
      id: 1,
      goodsName: '222',
      price: 23,
      goodsImgUrl:
        'https://image-c.weimobwmc.com/wrz/edb959a36de043e593c2f6971fed94cc.jpg',
    },
  ],
};

export default (state = initState, action) => {
  switch (action.type) {
    case GOODS_LIST: {
      console.info(action);
      return {
        ...state,
        goodsList: action.payload,
      };
    }
    default:
      return state;
  }
};
