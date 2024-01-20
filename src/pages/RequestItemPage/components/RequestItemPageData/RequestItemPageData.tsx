import {FC, memo, useCallback, useEffect, useState} from 'react';
import {Container, Table, FormCheck} from 'react-bootstrap';
import { DataItemModel } from 'store/models';
import {EDataType, EIsEncrypted, EWorkStatus} from "store/enums.ts";
// import defaultImage from "assets/default-image.svg";
import { useNavigate } from "react-router-dom";
import {useEncryptionRequestItem} from "store/encryptionRequestItem";

// interface IRequestItemPageData {
//     requestData: DataItemModel[];
// }

const RequestItemPageData : FC = memo(() => {
  const { request, requestData } = useEncryptionRequestItem();
  const navigate = useNavigate();

  const [masterCheckbox, setMasterCheckbox] = useState(false);
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);

  const handleRowClick = useCallback((id: number | undefined) => {
    if (!id) return;
    navigate(`/data/${id}`);
  }, []);

  useEffect(() => {
    setMasterCheckbox(false);
    setCheckboxes(Array(requestData.length).fill(false));
  }, [requestData.length]);

  useEffect(() => {
    if (checkboxes) {
      console.log(checkboxes, masterCheckbox);
    }

    if (checkboxes.every(value => value === true)) {
      setMasterCheckbox(true);
    } else {
      setMasterCheckbox(false);
    }
  }, [checkboxes, masterCheckbox]);

  const handleCheckboxChange = useCallback((index: number) => {
    setCheckboxes((prevState) => {
      return prevState.map((isChecked, i) => (i === index ? !isChecked : isChecked));
    });
  }, []);

  const handleMasterCheckboxChange = useCallback(() => {
    // console.log(masterCheckbox);
    setCheckboxes((prevState) => {
      return prevState.map(() => !masterCheckbox);
    });

    setMasterCheckbox(!masterCheckbox);
  }, [masterCheckbox]);


  return (
    <Container className={'mt-4'}>
      <Table hover={true} responsive={true}>
        <thead>
          <tr>
            { request.workStatus === EWorkStatus.DRAFT && <th className={'text-center'}>
                <FormCheck onChange={handleMasterCheckboxChange} checked={masterCheckbox} type={'checkbox'}/>
            </th>}
            <th>Заголовок</th>
            <th><span className={'text-success'}>Зашифровано</span> / <span className={'text-danger'}>Оригинал</span></th>
            <th>Тип файла</th>
          </tr>
        </thead>
        <tbody>
        {requestData.map((dataItem, index) => {
          const status = dataItem.isEncrypted === EIsEncrypted.true ? <span className={'text-success'}>Зашифровано</span> : <span className={'text-danger'}>Оригинал</span>;
          const type = dataItem.dataType === EDataType.TEXT ? 'Текстовый файл' : dataItem.dataType === EDataType.CODE ? 'Код' : 'Изображение';

          return <tr key={dataItem.id}>
            {request.workStatus === EWorkStatus.DRAFT && <th className={'text-center'}>
                <FormCheck onChange={() => handleCheckboxChange(index)} checked={checkboxes[index]} type={'checkbox'}/>
            </th>}
            <td onClick={() => handleRowClick(dataItem.id)}>{dataItem.title}</td>
            <td onClick={() => handleRowClick(dataItem.id)}>{ status }</td>
            <td onClick={() => handleRowClick(dataItem.id)}>{ type }</td>
          </tr>
        })}
        </tbody>
      </Table>
    </Container>
    )
});

export default RequestItemPageData;