import React from 'react';
import { useLocalStore } from 'mobx-react';
// @ts-ignore
import createStore, { GoodsStore } from './index.ts';

const storeContext = React.createContext<GoodsStore | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactChild }) => {
  const store = useLocalStore(createStore);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
};

export const useStore = () => {
  const store = React.useContext(storeContext);
  if (!store) {
    throw new Error('You have forgot to use StoreProvider, shame on you.');
  }
  return store;
};
