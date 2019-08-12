import React from 'react';
// 语法高亮
import 'prismjs/themes/prism.css';
// @ts-ignore
import Mdx from '@/components/DefineForm/README.md';

export default function Demo(): React.ReactElement {
  return (
    <div>
      <Mdx />
    </div>
  );
}
