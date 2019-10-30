import { PaginationConfig } from 'antd/lib/table';

interface IMetadata {
  key: string;
  value: any;
}

export interface IMetadataObj {
  [key: string]: IMetadata;
}

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
  handleOnChange?: any;
}
