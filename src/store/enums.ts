export enum EIsEncrypted {
    true = 1,
    false = 2
}

export enum EDataType {
    TEXT = 1,
    CODE = 2,
    IMAGE = 3
}

export enum EWorkStatus {
    DRAFT = "Черновик",
    FORMED = "Сформирован",
    FINALISED =  "Завершён",
    CANCELLED = "Отменён",
    DELETED =  "Удалён"
}

export enum EAction {
    ENCRYPT,
    DECRYPT
}