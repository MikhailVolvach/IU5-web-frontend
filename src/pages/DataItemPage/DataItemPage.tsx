import {Col, Container, Row} from "react-bootstrap";
import { memo, useState, useEffect } from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import DataItemPageContent from "pages/DataItemPage/components/DataItemPageContent";



const DataItemPage = memo(() => {
  const [data, setData] = useState();

  return (
    <Container>
      <Row>
        <DataItemPageHeader />
      </Row>
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><DataItemPageContent /></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
});

export default DataItemPage;