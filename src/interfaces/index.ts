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
