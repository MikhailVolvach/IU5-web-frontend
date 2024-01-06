/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface DataItem {
  /** ID */
  id?: number;
  /**
   * Img
   * @format uri
   */
  img?: string;
  /**
   * Title
   * @minLength 1
   * @maxLength 50
   */
  title: string;
  /**
   * File
   * @format uri
   */
  file?: string;
  /** Is encrypted */
  is_encrypted?: 1 | 2;
  /** Is deleted */
  is_deleted?: boolean;
  /** Data type */
  data_type?: 1 | 2 | 3;
}

export interface DataEncryptionRequest {
  /** ID */
  id?: number;
  /** Work status */
  work_status?: "Черновик" | "Сформирован" | "Завершён" | "Отменён" | "Удалён";
  /**
   * Creation date
   * @format date-time
   */
  creation_date?: string;
  /**
   * Formation date
   * @format date-time
   */
  formation_date?: string;
  /** User */
  user?: string;
  /** Action */
  action?: 0 | 1;
}

export interface EncryptionUser {
  /**
   * Имя пользователя
   * @minLength 1
   * @maxLength 30
   */
  username: string;
  /**
   * Password
   * @minLength 1
   * @maxLength 128
   */
  password: string;
  /** Роль пользователя */
  role?: 1 | 2 | 3;
  /** Is staff */
  is_staff?: boolean;
  /** Is superuser */
  is_superuser?: boolean;
  /** Is active */
  is_active?: boolean;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || "http://127.0.0.1:8000" });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Encryption API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://127.0.0.1:8000
 * @contact <mikhailvolvach@gmail.com>
 *
 * Encryption API
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  data = {
    /**
     * No description
     *
     * @tags data
     * @name DataList
     * @request GET:/data
     * @secure
     */
    dataList: (
      query?: {
        /** A search term. */
        search?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<void, any>({
        path: `/data`,
        method: "GET",
        query: query,
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataCreate
     * @request POST:/data
     * @secure
     */
    dataCreate: (data: DataItem, params: RequestParams = {}) =>
      this.request<DataItem, any>({
        path: `/data`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataRead
     * @request GET:/data/{id}
     * @secure
     */
    dataRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/data/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataUpdate
     * @request PUT:/data/{id}/
     * @secure
     */
    dataUpdate: (id: string, data: DataItem, params: RequestParams = {}) =>
      this.request<DataItem, any>({
        path: `/data/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataDelete
     * @request DELETE:/data/{id}
     * @secure
     */
    dataDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/data/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataAddToRequestCreate
     * @request POST:/data/{id}/add-to-request
     * @secure
     */
    dataAddToRequestCreate: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/data/${id}/add-to-request`,
        method: "POST",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags data
     * @name DataDeleteFromRequestDelete
     * @request DELETE:/data/{id}/delete-from-request
     * @secure
     */
    dataDeleteFromRequestDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/data/${id}/delete-from-request`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
  encryptionRequests = {
    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsList
     * @request GET:/encryption-requests
     * @secure
     */
    encryptionRequestsList: (params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/encryption-requests`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsFormUpdate
     * @request PUT:/encryption-requests/form
     * @secure
     */
    encryptionRequestsFormUpdate: (data: DataEncryptionRequest, params: RequestParams = {}) =>
      this.request<DataEncryptionRequest, any>({
        path: `/encryption-requests/form`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsRead
     * @request GET:/encryption-requests/{id}
     * @secure
     */
    encryptionRequestsRead: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/encryption-requests/${id}`,
        method: "GET",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsUpdate
     * @request PUT:/encryption-requests/{id}
     * @secure
     */
    encryptionRequestsUpdate: (id: string, data: DataEncryptionRequest, params: RequestParams = {}) =>
      this.request<DataEncryptionRequest, any>({
        path: `/encryption-requests/${id}`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsDelete
     * @request DELETE:/encryption-requests/{id}
     * @secure
     */
    encryptionRequestsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/encryption-requests/${id}`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * No description
     *
     * @tags encryption-requests
     * @name EncryptionRequestsChangeStatusUpdate
     * @request PUT:/encryption-requests/{id}/change-status
     * @secure
     */
    encryptionRequestsChangeStatusUpdate: (id: string, data: DataEncryptionRequest, params: RequestParams = {}) =>
      this.request<DataEncryptionRequest, any>({
        path: `/encryption-requests/${id}/change-status`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * No description
     *
     * @tags user
     * @name UserList
     * @request GET:/user/
     * @secure
     */
    userList: (params: RequestParams = {}) =>
      this.request<EncryptionUser[], any>({
        path: `/user/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserCreate
     * @request POST:/user/
     * @secure
     */
    userCreate: (data: EncryptionUser, params: RequestParams = {}) =>
      this.request<EncryptionUser, any>({
        path: `/user/`,
        method: "POST",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserRead
     * @request GET:/user/{id}/
     * @secure
     */
    userRead: (id: number, params: RequestParams = {}) =>
      this.request<EncryptionUser, any>({
        path: `/user/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserUpdate
     * @request PUT:/user/{id}/
     * @secure
     */
    userUpdate: (id: number, data: EncryptionUser, params: RequestParams = {}) =>
      this.request<EncryptionUser, any>({
        path: `/user/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserPartialUpdate
     * @request PATCH:/user/{id}/
     * @secure
     */
    userPartialUpdate: (id: number, data: EncryptionUser, params: RequestParams = {}) =>
      this.request<EncryptionUser, any>({
        path: `/user/${id}/`,
        method: "PATCH",
        body: data,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags user
     * @name UserDelete
     * @request DELETE:/user/{id}/
     * @secure
     */
    userDelete: (id: number, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/user/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),
  };
}
