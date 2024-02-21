import type { AxiosHeaders, AxiosInstance, HeadersDefaults, RawAxiosRequestHeaders } from 'axios';
import axios from 'axios';

type Headers = RawAxiosRequestHeaders | AxiosHeaders | Partial<HeadersDefaults>;

interface ApiConstructorParams {
  baseUrl: string;
  headers?: Headers;
}

export class API {
  public baseUrl: string;

  public request: AxiosInstance;

  constructor(options: ApiConstructorParams) {
    this.baseUrl = options.baseUrl;

    this.request = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'X-Custom-Header': 'foobar',
        ...options.headers
      },
      timeout: 1000
    });
  }
}
