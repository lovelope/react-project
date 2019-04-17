import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const HooksDemo: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={(): void => setOpen(true)}>OPEN</Button>
      <Modal
        visible={open}
        onOk={(): void => setOpen(false)}
        onCancel={(): void => setOpen(false)}
      />
    </>
  );
};

export default HooksDemo;
