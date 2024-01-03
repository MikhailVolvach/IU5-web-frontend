import {Col, Container, Row} from "react-bootstrap";
import {memo, useCallback, useEffect, useState} from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import DataItemPageContent from "pages/DataItemPage/components/DataItemPageContent";
import {useLocation, useParams} from "react-router-dom";
import {EDataFileTypeField} from "config/enums.ts";
import CustomBreadcrumbs from "ui/CustomBreadcrumbs";
import {getMockDataItem} from "utils/getMockData.ts";
import {DataItemResType} from "config/types.ts";
import {API_URL} from "config/config.tsx";


const DataItemPage = memo(() => {
  const [data, setData] = useState<DataItemResType>();
  const [fileData, setFileData] = useState<string>('');
  const { id } = useParams();

  const { pathname } = useLocation();


  const getFileData = useCallback(async (fileUrl: string) => {
    const resp = await fetch(fileUrl);

    if (resp.ok) {
      const fileData = await resp.text();
      setFileData(fileData);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {

      const resp = await fetch(`${API_URL}/data/${id}`);

      if (resp.ok) {
        const newData = await resp.json();
        setData(newData);

        if ((newData.data_type === EDataFileTypeField.TEXT_FILE || newData.data_type === EDataFileTypeField.CODE) && newData.file) {
          await getFileData(newData.file);
        }
      } else {
        const newData = getMockDataItem(Number(id) | 0);
        if ((newData.data_type === EDataFileTypeField.TEXT_FILE || newData.data_type === EDataFileTypeField.CODE) && newData.file) {
          await getFileData(newData.file);
        }
        setData(newData);
      }
    }

    getData();
  }, []);


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
        <Col xs={12} sm={10}><DataItemPageContent text={fileData} data={data}/></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
});

export default DataItemPage;