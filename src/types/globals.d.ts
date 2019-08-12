// 样式
declare module '*.css';
declare module '*.less';

// 图片
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

// md
declare module '*.md';

interface AnyObject {
  [key: string]: unknown;
}

interface Pagination {
  page: number;
  pageSize: number;
  totalCount: number;
}
