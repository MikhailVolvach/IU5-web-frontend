import {Col, Container, Row} from "react-bootstrap";
import { memo, useState, useEffect } from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import DataItemPageContent from "pages/DataItemPage/components/DataItemPageContent";
import {useParams} from "react-router-dom";


const DataItemPage = memo(() => {
  const [data, setData] = useState();
  const { id } = useParams();


  useEffect(() => {
    const getData = async () => {

      const resp = await fetch(`https://localhost/data/${id}`);

      if (resp.ok) {
        const newData = await resp.json();
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
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><DataItemPageContent data={data}/></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
});

export default DataItemPage;