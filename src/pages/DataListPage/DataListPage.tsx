import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fluid } from 'config/config';
// import DataListPageContent from "./components/DataListPageContent";
import {ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState} from "react";
import HeaderWithSearch from 'layout/HeaderWithSearch';
import defaultImage from 'assets/default-image.svg';

import { getListPageData, useDataList } from 'store/dataList';
import { useAppDispatch } from 'store/hooks';
import {Badge, Button, Card, Col} from "react-bootstrap";
import {EIsEncrypted} from "store/enums.ts";
import {addItemToRequest, useEncryptionRequestItem} from "store/encryptionRequestItem";
import {Link} from "react-router-dom";

export interface IDataListPage {
  searchQuery?: string;
  searchQueryChange?: (value: string) => void;
}

const DataListPage : FC<IDataListPage> = memo(({searchQuery = '', searchQueryChange = () => null}) => {
  const dispatch = useAppDispatch();

  const { data, orderId } = useDataList();
  const { requestData } = useEncryptionRequestItem();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    searchQueryChange(e.target[0]?.value);
  }, []);

  const fetchData = async () => {
    console.log('fetchData', orderId, searchQuery);
    dispatch(getListPageData(searchQuery));
  }

  const handleAddClick = useCallback((id: number | undefined) => {
    // TODO: Добавить обработку некорректного добавления
    if (!id) return;
    dispatch(addItemToRequest(`${id}`));
    // fetchData();
  }, [orderId]);

  useEffect(() => {
    fetchData();
  }, [orderId, requestData, searchQuery, dispatch]);


  return (
    <Container fluid={fluid}>
      <Row>
        <HeaderWithSearch 
          searchValue={searchValue}
          onSubmit={handleSearchSubmit}
          onSearchChange={handleSearchChange}
        />
      </Row>
      <Row xs={1} sm={2} md={3} lg={3} xl={4} className={'d-flex gy-4 gy'} >
        { data.map((dataItem) => (
          <Col key={dataItem?.id} className={'d-flex justify-content-center'}>
            <Card className={'h-100 overflow-hidden rounded-4 shadow-lg d-flex flex-column justify-content-between'} style={{ maxWidth: '17rem', width: '100%' }}>
              <Badge className={'position-absolute top-0 end-0 me-2 mt-2'} bg={dataItem.isEncrypted === EIsEncrypted.true ? 'success' : 'danger'} >{dataItem.isEncrypted === EIsEncrypted.true ? 'Зашифровано' : 'Оригинал'}</Badge>
              <Card.Img style={{width: '100%', maxHeight: '22.5rem', objectFit: 'fill'}} src={dataItem?.img || defaultImage} variant="top" />
              <Card.Body className={'flex-grow-0'}>
                <Card.Title>{dataItem?.title}</Card.Title>
                <Row className={'g-1'}>
                  <Col sm={12}>
                    <Button className={'w-100'} onClick={() => handleAddClick(dataItem.id)}>Добавить</Button>
                  </Col>
                  <Col sm={12}>
                    <Link className={'w-100'} to={`/data/${dataItem.id}`}><Button className={'w-100'} variant={'outline-primary'} >Подробнее</Button></Link>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        )) }
      </Row>
    </Container>
  );
});

export default DataListPage;
