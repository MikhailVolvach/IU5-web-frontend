import {FC, memo} from "react";
import {Button, Card, Col, Container, Placeholder, PlaceholderButton, Row} from "react-bootstrap";
import {useCreateCardButtonContent} from "utils/useCreateCardButtonContent.tsx";
import {EDataFileTypeField} from "config/enums.ts";
import CustomCardText from "ui/CustomCard/components/CustomCardText";

export interface ICustomCardBody {
    title?: string;
    text?: string;
    loading?: boolean;
    buttonsArr: string[];
    textType?: EDataFileTypeField;
}

const CustomCardBody: FC<ICustomCardBody> = memo(({ title = '', text = '', loading=false, buttonsArr, textType=EDataFileTypeField.TEXT_FILE}) => {
    return (
      <Card.Body>
          {loading || !title ? <Placeholder as={Card.Title} animation='glow'><Placeholder xs={6} /></Placeholder> : <Card.Title>{title}</Card.Title>}
          <CustomCardText text={text} textType={textType} />
          <Container>
              <Row xs={1} sm={2}>
                  {buttonsArr.map((button) => {
                    const buttonContent = useCreateCardButtonContent(button)
                    return <Col key={button + buttonContent} xs={12} sm={6} className={'p-1'}>
                      {loading || !button ? <PlaceholderButton className={'w-100'} variant="primary" xs={5}/> :
                        <Button className={'w-100'} variant="primary">{buttonContent}</Button>}
                    </Col>
                  })}
              </Row>
          </Container>
      </Card.Body>
    )
})

export default CustomCardBody;