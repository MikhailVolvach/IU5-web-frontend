import {EIsEncryptedField} from "config/enums.ts";

export const getBadgeTextFromState = (badgeState: 1 | 2 | undefined) : string => {
  return badgeState === EIsEncryptedField.ENCRYPTED ? 'Зашифрован' : 'Оригинал';
}