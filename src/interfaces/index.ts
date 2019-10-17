import { PaginationConfig, SorterResult, TableCurrentDataSource } from 'antd/lib/table';

export interface IApiFetch {
  method: string;
  url: string;
  body?: object;
  params?: string | string[];
  file?: boolean;
  formData?: FormData;
}

export interface IErrorControl {
  props: any;
  err: any;
  redirect?: boolean;
}

export interface IPropsTable {
  data: any[];
  pagination?: PaginationConfig | false;
  loading?: boolean;
  handleChange?: any;
}
