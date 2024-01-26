import {FC, memo, useCallback, useEffect, useState} from 'react';
import {Container, Table, FormCheck, Button, FormSelect} from 'react-bootstrap';
import {EDataType, EIsEncrypted, EWorkStatus} from "store/enums.ts";
import { useNavigate } from "react-router-dom";
import {useEncryptionRequestItem} from "store/encryptionRequestItem";
import {useAppDispatch} from "store";
import { deleteItemFromRequest } from 'store/encryptionRequestItem';


const RequestItemPageData : FC = memo(() => {
  const dispatch = useAppDispatch();
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
    console.log(checkboxes, masterCheckbox);

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
    setCheckboxes((prevState) => {
      return prevState.map(() => !masterCheckbox);
    });

    setMasterCheckbox(!masterCheckbox);
  }, [masterCheckbox]);

  const handleDeleteButton = useCallback(() => {
    console.log(checkboxes);
    checkboxes.forEach((value, index) => {
      console.log(requestData[index].id, value);
      if (!requestData[index].id) return;
      if (!value) return;
      console.log('About to be deleted');
      dispatch(deleteItemFromRequest(`${requestData[index].id}` || '-1'))
    })
  }, [checkboxes]);


  return (
    <Container className={'mt-4'}>
      <Table hover responsive borderless>
        { !requestData.length && <caption className={'text-danger'}>Данных нет</caption> }
        <thead>
        { request.workStatus === EWorkStatus.DRAFT && <tr>
            <th className={'text-center align-middle'}>
              {!!requestData.length && <FormCheck onChange={handleMasterCheckboxChange} checked={masterCheckbox} type={'checkbox'}/>}
            </th>
            <th className={'align-middle'}>{checkboxes.some(value => value === true) && <Button onClick={handleDeleteButton} size={'sm'}>Удалить</Button>}</th>
            <th>
              <FormSelect size="sm">
                <option>Все статусы</option>
                <option value={EIsEncrypted.true} className={'text-success'}>Зашифровано</option>
                <option value={EIsEncrypted.false} className={'text-danger'}>Оригинал</option>
              </FormSelect>
            </th>
            <th>
              <FormSelect size="sm">
                <option>Все типы файлов</option>
                <option value={EDataType.TEXT}>Текстовый файл</option>
                <option value={EDataType.CODE}>Код</option>
                <option value={EDataType.CODE}>Изображение</option>
              </FormSelect>
            </th>
          </tr>}
          <tr>
            <th></th>
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