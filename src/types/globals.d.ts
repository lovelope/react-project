// 样式
declare module '*.css';
declare module '*.less';

// 图片
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

interface Ipagination {
  page: number;
  pageSize: number;
  totalCount: number;
}
