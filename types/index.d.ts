declare module '*.png'

declare module 'nprogress'

declare module 'jsencrypt'
declare module 'lodash'
declare module 'lodash-es'
declare module 'lodash-es/*'

declare module '@dc/table'

declare type Nullable<T> = T | null;

declare type Recordable<T = any> = Record<string, T>;

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare type RefType<T> = T | null

declare type EmitType = (event: any, ...args: any[]) => void

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>


declare type TimeoutHandle = ReturnType<typeof setTimeout>

declare type IntervalHandle = ReturnType<typeof setInterval>

declare type LabelValueOptions = {
  label: string;
  value: any;
  [key: string]: string | number | boolean;
}[];

declare interface ChangeEvent extends Event {
  target: HTMLInputElement;
}



declare type TypeLabelValueOptions<T> = {
  label: string;
  value: T | any;
  [key: string]: string | number | boolean;
}[];

// 分页查询接口返回容器
declare interface PageDataWrap<T> {
  rows: T[]
  total: number
}

// 分页接口入参容器
declare interface IPageSearchPar {
  pageSize: number
  pageNo: number
}
