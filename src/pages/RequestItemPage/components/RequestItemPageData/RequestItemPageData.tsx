import {FC, memo, useCallback, useEffect, useState} from 'react';
import {Container, Table, FormCheck, Button, FormSelect} from 'react-bootstrap';
import {EDataType, EIsEncrypted, EWorkStatus} from "store/enums.ts";
import { useNavigate } from "react-router-dom";
import {useEncryptionRequestItem} from "store/encryptionRequestItem";
import {useAppDispatch} from "store";
import { deleteItemFromRequest } from 'store/encryptionRequestItem';
import { EBootstrapColor } from 'config/enums';
import { DataItemModel } from 'store/models';


const RequestItemPageData : FC = memo(() => {
  const dispatch = useAppDispatch();
  const { request, requestData } = useEncryptionRequestItem();
  const navigate = useNavigate();

  const [masterCheckbox, setMasterCheckbox] = useState(false);
  const [checkboxes, setCheckboxes] = useState<boolean[]>([]);

  const [statusSelect, setStatusSelect] = useState<EIsEncrypted | 0>(0);
  const [typeSelect, setTypeSelect] = useState<EDataType | 0>(0);
  const [data, setData] = useState<DataItemModel[]>([]); // Этот массив нужен для отображения отфильтрованных данных. Фильтровать будем по статусу и по типу, используя FormSelect

  const handleRowClick = useCallback((id: number | undefined) => {
    if (!id) return;
    navigate(`/data/${id}`);
  }, []);

  // Отрабатывает при изменении requestData, т.е. в момент удаления из заявки и первом рендере
  useEffect(() => {
    setMasterCheckbox(false);
    setCheckboxes(Array(requestData.length).fill(false));
    setData(requestData);
  }, [requestData.length]);

  useEffect(() => {

    if (checkboxes.every(value => value === true)) {
      setMasterCheckbox(true);
    } else {
      setMasterCheckbox(false);
    }
  }, [checkboxes, masterCheckbox]);

  // Отрабатывает при изменении статуса для фильтрации отображаемых данных
  useEffect(() => {
    if (statusSelect === 0 && typeSelect === 0) {
      setData(requestData);
      return;
    }

    if (statusSelect !== 0 && typeSelect === 0) {
      setData(requestData.filter((value) => value.isEncrypted === statusSelect));
      return;
    }

    if (statusSelect === 0 && typeSelect !== 0) {
      setData(requestData.filter((value) => value.dataType === typeSelect));
      return;
    }

    setData(requestData.filter((value) => value.isEncrypted === statusSelect).filter((value) => value.dataType === typeSelect));
  }, [statusSelect, typeSelect, requestData.length]);

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
    checkboxes.forEach((value, index) => {
      if (!data[index].id) return;
      if (!value) return;
      dispatch(deleteItemFromRequest(`${data[index].id}` || '-1'))
    })
  }, [checkboxes]);

  const handleStatusChange = useCallback((e: any) => {
    setStatusSelect(+e.target.value);
  }, []);

  const handleTypeChange = useCallback((e: any) => {
    setTypeSelect(+e.target.value);
  }, []);


  return (
    <Container className={'mt-4'}>
      <Table hover responsive borderless>
        { !data.length && <caption className={'text-danger'}>Данных нет</caption> }
        <thead>
        { request.workStatus === EWorkStatus.DRAFT && <tr>
            <th className={'text-center align-middle'}>
              {!!data.length && <FormCheck onChange={handleMasterCheckboxChange} checked={masterCheckbox} type={'checkbox'}/>}
            </th>
            <th className={'align-middle'}>{checkboxes.some(value => value === true) && <Button onClick={handleDeleteButton} variant={EBootstrapColor.DANGER} size={'sm'}>Удалить</Button>}</th>
            <th>
              <FormSelect value={statusSelect} onChange={handleStatusChange} size="sm">
                <option value={0}>Все статусы</option>
                <option value={EIsEncrypted.true} className={'text-success'}>Зашифровано</option>
                <option value={EIsEncrypted.false} className={'text-danger'}>Оригинал</option>
              </FormSelect>
            </th>
            <th>
              <FormSelect size="sm" onChange={handleTypeChange} value={typeSelect}>
                <option value={0}>Все типы файлов</option>
                <option value={EDataType.TEXT}>Текстовый файл</option>
                <option value={EDataType.CODE}>Код</option>
                <option value={EDataType.IMAGE}>Изображение</option>
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
        {data.map((dataItem, index) => {
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