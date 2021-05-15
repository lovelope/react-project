import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react';
import { Button, Table } from 'antd';
import { useStore, StoreProvider } from '@/store/setupContext';
import s from './goodsList.module.less';
import { getColumns } from './const';

const columns = getColumns({
  renderImg: (src: string): React.ReactElement => <img src={src} alt="" />,
});

const GoodsList = observer((): React.ReactElement => {
  const store = useStore();
  const [loading, setLoading] = useState<boolean>(false);

  const handleClickItem = useCallback(async (): Promise<void> => {
    setLoading(true);
    await store.getGoodsList();
    setLoading(false);
  }, []);

  return (
    <div className={s.goodsListContainer}>
      <Table
        columns={columns}
        dataSource={store.goodsList.slice()}
        rowKey="id"
      />

      <Button
        type="primary"
        className={s.btn}
        loading={loading}
        onClick={handleClickItem}
      >
        获取新数据
      </Button>
    </div>
  );
});

export default function WithStoreGoodsList(): React.ReactElement {
  return (
    <StoreProvider>
      <GoodsList />
    </StoreProvider>
  );
}
