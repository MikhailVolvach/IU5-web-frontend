import {FC, memo} from "react";
import {Button, Card, Col, Container, Placeholder, PlaceholderButton, Row} from "react-bootstrap";
import {ButtonType} from "config/types.ts";

export interface ICustomCardBody {
    title?: string;
    text?: string;
    loading?: boolean;
    buttonsArr: ButtonType[],
}

const CustomCardBody: FC<ICustomCardBody> = memo(({ title = "", text = "", loading=false, buttonsArr}) => {
    return (
      <Card.Body>
          {loading || !title ? <Placeholder as={Card.Title} animation="glow"><Placeholder xs={6} /></Placeholder> : <Card.Title>{title}</Card.Title>}
          {loading || !text ? <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={10}/>{' '}
                <Placeholder xs={10} /></Placeholder> : <Card.Text>{text}</Card.Text>}
          <Container>
              <Row xs={1} sm={2}>
                  {buttonsArr.map((button) => (
                    <Col xs={12} sm={6} className={'p-1'}>
                        {loading || !button.buttonContent ? <PlaceholderButton className={'w-100'} key={button.buttonName} variant="primary" xs={5} /> : <Button className={'w-100'} key={button.buttonName} variant="primary" >{button.buttonContent}</Button>}
                    </Col>
                  ))}
              </Row>
          </Container>


      </Card.Body>
    )




    // {buttonText ? <Button variant="primary">{buttonText}</Button> :
    //   <Placeholder.Button variant="primary" xs={6} />
    // }
    //         }
    //
    //         {title ? <Card.Title>{title}</Card.Title>
    //         : <Placeholder as={Card.Title} animation="glow">
    //             <Placeholder xs={6} />
    //     </Placeholder>}
    //         {text ? <Card.Text>{text}</Card.Text> :
    //         <Placeholder as={Card.Text} animation="glow">
    //             <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
    //             <Placeholder xs={6} /> <Placeholder xs={8} />
    //         </Placeholder>
    //         }
    //         {buttonText ? <Button variant="primary">{buttonText}</Button> :
    //         <Placeholder.Button variant="primary" xs={6} />
    //         }
    //     </Card.Body>
    //     );
})

export default CustomCardBody;