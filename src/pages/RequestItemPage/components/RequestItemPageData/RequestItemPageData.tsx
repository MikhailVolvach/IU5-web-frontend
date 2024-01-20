import {FC, memo, useCallback, useState} from 'react';
import {Container, Table, FormCheck} from 'react-bootstrap';
import { DataItemModel } from 'store/models';
import {EDataType, EIsEncrypted, EWorkStatus} from "store/enums.ts";
// import defaultImage from "assets/default-image.svg";
import { useNavigate } from "react-router-dom";
import {useEncryptionRequestItem} from "store/encryptionRequestItem";

interface IRequestItemPageData {
    requestData: DataItemModel[];
}

const RequestItemPageData : FC<IRequestItemPageData> = memo(({requestData}) => {
  const { request } = useEncryptionRequestItem();
  const navigate = useNavigate();
  const [isSelectedAll, setIsSelectedAll] = useState(false);

  const handleRowClick = useCallback((id: number | undefined) => {
    if (!id) return;
    navigate(`/data/${id}`);
  }, []);

  const handleSelectAll = useCallback(() => {
    setIsSelectedAll(!isSelectedAll);
  }, []);

  return (
    <Container className={'mt-4'}>
      {/*<Row xs={1} sm={2} md={3} lg={3} xl={4} className={'d-flex gy-4 gy'} >*/}
      {/*  { requestData.map((dataItem) => (*/}
      {/*    <Col key={dataItem?.id} className={'d-flex justify-content-center'}>*/}
      {/*      <Card className={'h-100 overflow-hidden rounded-4 shadow-lg d-flex flex-column justify-content-between'} style={{ maxWidth: '17rem', width: '100%' }}>*/}
      {/*        {request.workStatus === EWorkStatus.DRAFT && <CloseButton className={'position-absolute top-0 start-0 me-2 mt-2'}/>}*/}
      {/*        <Badge className={'position-absolute top-0 end-0 me-2 mt-2'} bg={dataItem.isEncrypted === EIsEncrypted.true ? 'success' : 'danger'} >{dataItem.isEncrypted === EIsEncrypted.true ? 'Зашифровано' : 'Оригинал'}</Badge>*/}
      {/*        <Card.Img style={{width: '100%', maxHeight: '22.5rem', objectFit: 'fill'}} src={dataItem?.img || defaultImage} variant="top" />*/}
      {/*        <Card.Body className={'flex-grow-0'}>*/}
      {/*          <Card.Title>{dataItem?.title}</Card.Title>*/}
      {/*          <Row className={'g-1'}>*/}
      {/*            <Col sm={12}>*/}
      {/*              <Link className={'w-100'} to={`/data/${dataItem.id}`}><Button className={'w-100'} variant={'outline-primary'} >Подробнее</Button></Link>*/}
      {/*            </Col>*/}
      {/*          </Row>*/}
      {/*        </Card.Body>*/}
      {/*      </Card>*/}
      {/*    </Col>*/}
      {/*  )) }*/}
      {/*</Row>*/}
      <Table hover={true} responsive={true}>
        <thead>
          <tr>
            { request.workStatus === EWorkStatus.DRAFT && <th className={'text-center'} onClick={() => handleSelectAll()}><FormCheck type={'checkbox'}/></th>}
            <th>Заголовок</th>
            <th><span className={'text-success'}>Зашифровано</span> / <span className={'text-danger'}>Оригинал</span></th>
            <th>Тип файла</th>
          </tr>
        </thead>
        <tbody>
        {requestData.map((dataItem) => {
          const status = dataItem.isEncrypted === EIsEncrypted.true ? <span className={'text-success'}>Зашифровано</span> : <span className={'text-danger'}>Оригинал</span>;
          const type = dataItem.dataType === EDataType.TEXT ? 'Текстовый файл' : dataItem.dataType === EDataType.CODE ? 'Код' : 'Изображение';

          return <tr key={dataItem.id}>
            {request.workStatus === EWorkStatus.DRAFT && <th className={'text-center'}><FormCheck type={'checkbox'}/></th>}
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