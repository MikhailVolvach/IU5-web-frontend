import {Col, Container, Row} from "react-bootstrap";
import Header from "layout/Header";
import CustomCard from "ui/CustomCard";

const DataItemPage = () => {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><CustomCard isVertical={false} /></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
};

export default DataItemPage;