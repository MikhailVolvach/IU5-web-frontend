import {Col, Row} from "react-bootstrap";
import CustomCard from "ui/CustomCard";
import Container from "react-bootstrap/Container";

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

const Content = () => {
  return (
    <>
      <Container >
        <Row xs={1} sm={1} md={2} lg={3} xl={4}>
          {cards.map(card => (
            <Col className={'text-center gy-4'}>
              <CustomCard
                title={card.title}
                text={card.text}
                buttonText={card.buttonText}
                badgeText={card.badgeText}
                badgeState={card.badgeState}
                img={card.img} />
            </Col>
          ))}
        </Row>
      </Container>


    </>
  );
};

export default Content;