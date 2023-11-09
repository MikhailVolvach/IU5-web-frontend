import {Col, Container, Row} from "react-bootstrap";
import Header from "layout/Header";
import CustomCard from "ui/CustomCard";
import {ButtonType} from "config/types.ts";
import Icon from "ui/Icon";
import { memo } from "react";

const CardButtonsArr : ButtonType[] = [
  {
    buttonName: 'add',
    buttonContent: <><Icon size={18} iconName={'FolderPlus'} /> Добавить</>
  }
]

const DataItemPage = memo(() => {
  return (
    <Container>
      <Row>
        <Header />
      </Row>
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><CustomCard isVertical={false} buttonsArr={CardButtonsArr} /></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
});

export default DataItemPage;