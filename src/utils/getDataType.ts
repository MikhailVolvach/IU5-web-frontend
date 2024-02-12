export const getDataType = (dataType : number) => {
    if (dataType === 1) {
        return 'Текстовый файл';
    } else if (dataType === 2) {
        return 'Код';
    } else if (dataType === 3) {
        return 'Изображение'
    }
}