import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import CustomCard from "ui/CustomCard";
import {ButtonType} from "config/types.ts";
import { Link } from "react-router-dom";
import { memo } from "react";

const cards = [
  {
    title: "1",
    img: "",
    text: "Lorem ipsum",
    buttonText: "Click",
    badgeState: true,
    badgeText: "badge"
  },
  {
    title: "2",
    img: "",
    text: "Lorem ipsum",
    buttonText: "Click",
    badgeState: false,
    badgeText: "badge"
  },
  {
    title: "3",
    img: "",
    text: "Lorem ipsum",
    buttonText: "Click",
    badgeState: false,
    badgeText: "badge"
  },
  {
    title: "4",
    img: "",
    text: "Lorem ipsum",
    buttonText: "Click",
    badgeState: false,
    badgeText: "badge"
  },
  {
    title: "4",
    img: "",
    text: "Lorem ipsum",
    buttonText: "Click",
    badgeState: false,
    badgeText: "badge"
  }
];

const CardButtonsArr : ButtonType[] = [
  {
    buttonName: 'add',
    buttonContent: <div className={'d-flex flex-nowrap justify-content-center align-content-center'}>Добавить</div>
  },
  {
    buttonName: 'remove',
    buttonContent: <div className={'d-flex flex-nowrap justify-content-center align-items-center'}>Удалить</div>
  }
]

const DataListPageContent = memo(() => {
  return (
    <>
      <Container >
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {cards.map(card => (
            <Col key={`${card.title}`} className={'text-center gy-4'}>
              <Link to={'/data/1'} className={'link-underline link-underline-opacity-0'}>
              <CustomCard
                loading={false}
                title={card.title}
                text={card.text}
                buttonsArr={CardButtonsArr}
              />
              </Link>
            </Col>
          ))}
        </Row>
      </Container>


    </>
  );
});

export default DataListPageContent;