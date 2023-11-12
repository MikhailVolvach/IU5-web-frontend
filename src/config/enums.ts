import {KeyValue} from "config/types.ts";

export enum EBootstrapColor {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    SUCCESS = 'success',
    DANGER = 'danger',
    WARNING = 'warning',
    INFO = 'info',
    LIGHT = 'light',
    DARK = 'dark'
}

export enum EBootstrapFluid {
    SM = 'sm',
    MD = 'md',
    LG = 'lg',
    XL = 'xl',
    XXL = 'xxl'
}

export enum EDataFileTypeField {
    TEXT_FILE = 1,
    CODE = 2,
    IMAGE = 3
}

export enum EIsEncryptedField {
    ENCRYPTED = 1,
    ORIGINAL = 2
}

export const CardButtonInfo: KeyValue = {
    'ADD': 'Добавить',
    'MORE': 'Подробнее',
    'REMOVE': 'Удалить'
}

