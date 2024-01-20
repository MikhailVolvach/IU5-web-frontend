import { EDataType, EIsEncrypted, EAction, EWorkStatus } from './enums';

export interface DataItemModel {
    id?: number;
    img?: string;
    title?: string;
    file?: string;
    isEncrypted?: EIsEncrypted;
    isDeleted?: Boolean;
    dataType?: EDataType;
};

export interface DataEncryptionRequestModel {
    id?: number;
    workStatus?: EWorkStatus;
    creationDate?: string;
    formationDate?: string;
    user?: string;
    action?: EAction;
}