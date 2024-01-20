import { DataEncryptionRequest, DataItem } from '../api';
import { DataEncryptionRequestModel, DataItemModel } from './models';
import { EAction, EDataType, EIsEncrypted, EWorkStatus } from './enums';

const formateDate = (dateString: string | undefined) : string => {
    return new Date(dateString || '').toLocaleString();
}

const getDataType = (dataType : 1 | 2 | 3) : EDataType => {
    switch (dataType) {
        case 1:
            return EDataType.TEXT;
        case 2:
            return EDataType.CODE;
        case 3:
            return EDataType.IMAGE;
        default:
            return EDataType.TEXT;
    }
}

const getWorkStatus = (workStatus : "Черновик" | "Сформирован" | "Завершён" | "Отменён" | "Удалён") : EWorkStatus => {
    switch (workStatus) {
        case "Черновик":
            return EWorkStatus.DRAFT;
        case "Завершён":
            return EWorkStatus.FINALISED;
        case "Отменён":
            return EWorkStatus.CANCELLED;
        case "Сформирован":
            return EWorkStatus.FORMED;
        case "Удалён":
            return EWorkStatus.DELETED;
        default:
            return EWorkStatus.DRAFT;
    }
}

export const EncryptionRequestSerializer = (reqApi: DataEncryptionRequest) : DataEncryptionRequestModel => {
    return {
        id: reqApi?.id || -1,
        workStatus: getWorkStatus(reqApi?.work_status || "Черновик"),
        creationDate: formateDate(reqApi?.creation_date),
        formationDate: formateDate(reqApi?.formation_date),
        user: reqApi?.user || '',
        action:  reqApi.action === 0 ? EAction.ENCRYPT : EAction.DECRYPT,
    };
}

export const DataItemSerializer = (dataApi: DataItem) : DataItemModel => {
    return {
        id: dataApi?.id || -1,
        img: dataApi?.img || '',
        title: dataApi?.title || '',
        file: dataApi?.file || '',
        isEncrypted: dataApi?.is_encrypted === 1 ? EIsEncrypted.true : EIsEncrypted.false,
        isDeleted: dataApi.is_deleted || false,
        dataType: getDataType(dataApi.data_type || 1)
    }
}

