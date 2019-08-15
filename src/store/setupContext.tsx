import React from 'react';
import { useLocalStore } from 'mobx-react';
import createStore, { GoodsStore } from './index';

const storeContext = React.createContext<GoodsStore | null>(null);

export const StoreProvider = ({
  children,
}: {
  children: React.ReactChild;
}): React.ReactElement => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = (): GoodsStore => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};
