import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fluid } from 'config/config';
import DataListPageContent from "./components/DataListPageContent";
import DataListPageHeader from "./components/DataListPageHeader";
import { memo } from "react";

const DataListPage = memo(() => {
  return (
    <Container fluid={fluid}>
      <Row>
        <DataListPageHeader itemsInCart={10}/>
      </Row>
      <Row>
        <DataListPageContent />
      </Row>
    </Container>
  );
});

export default DataListPage;