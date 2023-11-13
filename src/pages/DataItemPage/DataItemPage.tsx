import {Col, Container, Row} from "react-bootstrap";
import {memo, useCallback, useEffect, useState} from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import DataItemPageContent from "pages/DataItemPage/components/DataItemPageContent";
import {useParams} from "react-router-dom";
import {EDataFileTypeField} from "config/enums.ts";


const DataItemPage = memo(() => {
  const [data, setData] = useState();
  const [fileData, setFileData] = useState<string>();
  const { id } = useParams();

  const getFileData = useCallback(async (fileUrl: string) => {
    console.log(fileUrl);
    const resp = await fetch(fileUrl);

    if (resp.ok) {
      const fileData = await resp.text();
      console.log(fileData);
      setFileData(fileData);
    }
  }, []);

  useEffect(() => {
    const getData = async () => {

      const resp = await fetch(`https://localhost/data/${id}`);

      if (resp.ok) {
        const newData = await resp.json();
        setData(newData);

        if (newData.data_type === EDataFileTypeField.TEXT_FILE || newData.data_type === EDataFileTypeField.CODE) {
          await getFileData(newData.file);
        }
      }
    }

    getData();
  }, []);

  return (
    <Container>
      <Row>
        <DataItemPageHeader />
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