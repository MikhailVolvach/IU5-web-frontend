import {Badge, Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {FC, memo, useCallback, useEffect, useState} from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import { useLocation, useParams } from "react-router-dom";
import CustomBreadcrumbs from "ui/CustomBreadcrumbs";
import {useDataItem, getItemPageData} from 'store/dataItem';
import { useAppDispatch } from "store/hooks";
import axios from "axios";
import CustomSpinner from "ui/CustomSpinner";
import {EDataType, EIsEncrypted} from "store/enums.ts";
import defaultImage from "assets/default-image.svg";
import SyntaxHighlighter from "react-syntax-highlighter";
import {coy as theme} from "react-syntax-highlighter/dist/esm/styles/prism";

interface ICodeData {
  data: string;
}

const DataItemPage = memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  const [fileData, setFileData] = useState<string>('');
  const [isShow, setIsShow] = useState(false);
  
  const { isLoaded, data } = useDataItem();

  const getFileData = async () => {   
    if (id == undefined) return;

    if (!data?.file) return;

    if (+id !== data?.id) return;

    console.log(data?.id, id);
    axios.get(data?.file)
        .then((response) => {
            setFileData(response.data);
        })
  };

  const openModal = useCallback(() => {
    setIsShow(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsShow(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id == undefined) {return};
        await dispatch(getItemPageData(id));  
        if (isLoaded) getFileData();  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [id, dispatch, data.id]);

  if (!isLoaded) {
    return <CustomSpinner />;
  }

  const CodeData: FC<ICodeData> = memo(({data = ''}) => <SyntaxHighlighter language="javascript" style={theme} wrapLongLines={true}>{data}</SyntaxHighlighter>);

  const croppedFileData = fileData.slice(0, 1000);

  return (
    <Container>
      <Row>
        <DataItemPageHeader />
      </Row>
      <Row className={'mb-3'}>
        <CustomBreadcrumbs breadcrumbsStr={pathname} />
      </Row>
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}>
          {/*<CustomCard withLoader={true} textType={data?.dataType} text={fileData} img={data?.img} title={data?.title} badgeText={data?.isEncrypted ? getBadgeTextFromState(data?.isEncrypted) : ''} badgeState={data?.isEncrypted} isVertical={false} buttonsArr={CardButtonsArr.filter((button: string) => button === 'ADD')} />*/}
          <Card className={'w-100 mx-auto'} style={{ width: '100%' }}>
            <Row>
              <Col><Card.Img style={{width: '100%', objectFit: 'cover'}} src={data?.img || defaultImage} variant="top" /></Col>
              <Col>
                <Card.Title>{data?.title}<Badge className={'ms-3'} bg={data.isEncrypted === EIsEncrypted.true ? 'success' : 'danger'}>{data.isEncrypted === EIsEncrypted.true ? 'Зашифровано' : 'Оригинал'}</Badge></Card.Title>
                {fileData && data.dataType === EDataType.TEXT && <Card.Text>{croppedFileData}{croppedFileData.length < fileData.length && <Button onClick={openModal} variant={'link'}>Подробнее...</Button>}</Card.Text>}
                {fileData && data.dataType === EDataType.CODE && <CodeData data={croppedFileData} />}
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={'auto'}></Col>
      </Row>

      <Modal scrollable={true} show={isShow} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{data.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{fileData}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
});

export default DataItemPage;