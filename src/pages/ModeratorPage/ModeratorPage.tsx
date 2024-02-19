import {FormEvent, memo, useCallback, useEffect, useState} from "react";
import {Container, Row, Table, Modal, Button, InputGroup, Col} from "react-bootstrap";
import { fluid } from "config/config.tsx";
import Header from "layout/Header";
import {useAppDispatch} from "store";
import {getListPageData, useDataList} from "store/dataList";
import {DataItemModel} from "store/models.ts";
import Form from "react-bootstrap/Form";
import {EDataType, EIsEncrypted} from "store/enums.ts";
import {addDataItem} from "store/dataList/getListPageData.ts";
import {changeDataItem, deleteDataItem} from "store/dataItem/getItemPageData.ts";

const ModeratorPage = memo(() => {

  const dispatch = useAppDispatch();

  const { data } = useDataList();

  const [ showModal, setShowModal ] = useState(false);
  const [ currentDataItem, setCurrentDataItem ] = useState<DataItemModel>({} as DataItemModel);
  const [ operation, setOperation ] = useState<'CHANGE' | 'ADD'>('CHANGE');
  const [ reload, setReload ] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getListPageData());
  }, [dispatch, reload]);

  // const urlCellStyle = {
  //   'overflow': 'scroll visible',
  //   'whiteSpace': 'nowrap',
  // }

  const handleOpenModal = useCallback((dataItem : DataItemModel = {} as DataItemModel) => {
    if (!!dataItem.id) {
      setOperation('CHANGE');
    } else {
      setOperation('ADD');
    }

    setShowModal(true);
    setCurrentDataItem(dataItem);
    console.log(currentDataItem);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCurrentDataItem({} as DataItemModel);
  }, []);

  // @ts-ignore
  const handleFormInputChange = useCallback((event) => {
    const { name, value, type, checked, files } = event.target;

    // @ts-ignore
    let newValue = null;

    if (name === 'is_encrypted') {
      newValue = checked === true ? 1 : 2;
    } else if (type === 'file') {
      if (name === 'img') {
        newValue = files[0];
      } else {
        newValue = files[0];
      }
    } else {
      newValue = value;
    }

    // @ts-ignore
    setCurrentDataItem(prevState => ({...prevState, [name]: newValue}));

    // console.log(currentDataItem);
  }, [currentDataItem])

  const handleSubmitModal = useCallback((event : FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (operation === 'ADD') {
      dispatch(addDataItem(currentDataItem));
      setReload(!reload);
      handleCloseModal();
      return;
    }

    // @ts-ignore
    dispatch(changeDataItem({id: currentDataItem.id, itemData: currentDataItem}));
    handleCloseModal();
  }, [currentDataItem]);

  const handleDeleteButton = useCallback(() => {
    dispatch(deleteDataItem(currentDataItem.id));
    setReload(!reload);
    handleCloseModal();
  }, [currentDataItem])

  return (
    <>
      <Container fluid={fluid}>
        <Row>
          <Header />
        </Row>
        <Row>
          <Col>
            <Button onClick={() => handleOpenModal()} variant={'success'}>Добавить данные</Button>
          </Col>
        </Row>
        <Row>
          <Table responsive hover>
            <thead>
              <tr>
                <td>ИД</td><td>Название</td><td>Изображение</td><td>Файл</td><td>Тип</td><td>Статус</td><td>Удалено?</td>
              </tr>
            </thead>
            <tbody>
            {!!data && data.map((dataItem) => <tr key={dataItem.id} onClick={() => handleOpenModal(dataItem)}>
              <td>{dataItem.id}</td>
              <td>{dataItem.title}</td>
              <td>{dataItem.img}</td>
              <td>{dataItem.file}</td>
              <td>{dataItem.dataType}</td>
              <td>{dataItem.isEncrypted}</td>
              <td>{dataItem.isDeleted ? 'Да' : 'Нет'}</td>
            </tr>)}
            </tbody>
          </Table>
        </Row>
      </Container>
      <Modal show={showModal} onHide={handleCloseModal} >
        <Modal.Header closeButton>
          <Modal.Title>Редактирование</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate onSubmit={handleSubmitModal} encType="multipart/form-data">
            <Form.Group>
              <Form.Label>Заголовок</Form.Label>
              <Form.Control value={currentDataItem.title} name={'title'} onChange={handleFormInputChange} />
            </Form.Group>
            <Form.Group className={'mt-3'}>
              <Form.Label>Изображение</Form.Label>
              <InputGroup>
                <Form.Control name={'img'} onChange={handleFormInputChange} type='file' />
                {!!currentDataItem.img && <InputGroup.Text style={{overflow: 'hidden'}}>{currentDataItem.img}</InputGroup.Text>}
              </InputGroup>
            </Form.Group>
            <Form.Group className={'mt-3'}>
              <Form.Label>Файл</Form.Label>
              <InputGroup>
                <Form.Control name={'file'} onChange={handleFormInputChange} type='file' />
                {!!currentDataItem.file && <InputGroup.Text style={{overflow: 'hidden'}}>{currentDataItem.file}</InputGroup.Text>}
              </InputGroup>

            </Form.Group>
            <Form.Group>
              <Form.Label>Тип файла</Form.Label>
              <Form.Select name={'data_type'} value={currentDataItem.dataType} onChange={handleFormInputChange}>
                <option value={EDataType.TEXT}>Текстовый файл</option>
                <option value={EDataType.CODE}>Код</option>
                <option value={EDataType.IMAGE}>Изображение</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className={'mt-3'} >
              <Form.Check checked={currentDataItem.isEncrypted === EIsEncrypted.true} value={`${currentDataItem.isEncrypted === EIsEncrypted.true}`} name={'is_encrypted'} onChange={handleFormInputChange} type='switch' label={'Зашифровано'}/>
            </Form.Group>

            <Button variant="danger" onClick={handleDeleteButton}>
              Удалить
            </Button>
            <Button variant="primary" type='submit'>
              Сохранить
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
});

export default ModeratorPage;