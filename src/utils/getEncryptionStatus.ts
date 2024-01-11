export const getEncryptionStatus = (status : number) => {
    if (status === 2) {
        return 'Не зашифровано';
    } else if (status === 1) {
        return 'Зашифровано';
    } else {
        return;
    }
}