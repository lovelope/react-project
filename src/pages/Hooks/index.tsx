import React, { useState } from 'react';
import { Button, Modal } from 'antd';

const HooksDemo: React.FC = (): React.ReactElement => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>OPEN</Button>
      <Modal
        visible={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default HooksDemo;
