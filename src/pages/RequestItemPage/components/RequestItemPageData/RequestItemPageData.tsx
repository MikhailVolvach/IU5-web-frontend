import { FC, memo, useCallback } from 'react';
import { Table, Image, Button } from 'react-bootstrap';
import { DataItem } from 'api';
import { getEncryptionStatus } from 'utils/getEncryptionStatus';
import { getDataType } from 'utils/getDataType';


interface IRequestItemPageData {
    requestData: DataItem[];
}

const RequestItemPageData : FC<IRequestItemPageData> = memo(({requestData}) => {
    const openFileInNewTab = useCallback((fileUrl : string | undefined) => {
        if (fileUrl === undefined) return;
        window.open(fileUrl, '_blank');
    }, []);

    return (
        <Table>
            <thead>
                <tr>
                    <th>Изображение</th>
                    <th>Название</th>
                    <th>Файл</th>
                    <th>Зашифровано</th>
                    <th>Тип данных</th>
                </tr>
            </thead>
            <tbody>
                {requestData.map((dataItem) => (
                <tr key={dataItem.id}>
                    <th><Image src={dataItem.img} fluid/></th>
                    <th>{dataItem.title}</th>
                    <th>{dataItem.file && <Button variant='link' onClick={() => openFileInNewTab(dataItem.file)}>{dataItem.file}</Button>}</th>
                    <th>{getEncryptionStatus(dataItem.is_encrypted || 1)}</th>
                    <th>{getDataType(dataItem.data_type || 1)}</th>
                </tr>))}
            </tbody>
        </Table>
    )
});

export default RequestItemPageData;