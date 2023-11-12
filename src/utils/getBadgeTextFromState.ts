import {EIsEncryptedField} from "config/enums.ts";

export const getBadgeTextFromState = (badgeState: EIsEncryptedField) : string => {
  return badgeState === EIsEncryptedField.ENCRYPTED ? 'Зашифрован' : 'Оригинал';
}