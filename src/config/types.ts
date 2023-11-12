import { ReactNode } from "react";
import {EDataFileTypeField, EIsEncryptedField} from "config/enums.ts";

export type ButtonType = {
  buttonName: string;
  buttonContent:  ReactNode | string;
}

export type DataListResType = {
  request_id: number;
  data: DataItemResType[]
}

export type DataItemResType = {
  id: number;
  img: string;
  title: string;
  file: string;
  data_type: EDataFileTypeField
  is_encrypted: EIsEncryptedField;
  is_deleted: boolean;
}

