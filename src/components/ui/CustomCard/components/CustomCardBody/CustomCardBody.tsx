import {FC, memo} from "react";
import {Button, Card, Col, Container, Placeholder, PlaceholderButton, Row} from "react-bootstrap";
import {useCreateCardButtonContent} from "utils/useCreateCardButtonContent.tsx";
import {EDataFileTypeField} from "config/enums.ts";
import CustomCardText from "ui/CustomCard/components/CustomCardText";
import {Link} from "react-router-dom";

export interface ICustomCardBody {
    title?: string;
    text?: string;
    loading?: boolean;
    buttonsArr: string[];
    textType?: EDataFileTypeField;
    url?: string;
    onClick?: (e:React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomCardBody: FC<ICustomCardBody> = memo(({ title = '', text = '', loading=false, buttonsArr, textType=EDataFileTypeField.TEXT_FILE, url = '', onClick = () => {return} }) => {
  const buttonColSm = Math.floor(12 / (buttonsArr.length + 1));
    return (
      <Card.Body className={'w-100'}>
          {loading || !title ? <Placeholder as={Card.Title} animation='glow' className={'w-100'}><Placeholder xs={12} sm={12} md={12} /></Placeholder> : <Card.Title>{title}</Card.Title>}
          <CustomCardText text={text} textType={textType} />
          <Container>
              <Row xs={1} sm={buttonsArr.length + 1} className={'d-flex justify-content-center'}>
                  {buttonsArr.map((button) => {
                    const buttonContent = useCreateCardButtonContent(button)
                    return <Col key={button + buttonContent} xs={12} sm={buttonColSm} className={'p-1'}>
                      {!button ? <PlaceholderButton className={'w-100'} variant="primary" xs={5}/> :
                        <Button className={'w-100'} variant="primary" onClick={onClick}>{buttonContent}</Button>}
                    </Col>
                  })}
                {url &&
                <Col xs={12} sm={buttonColSm} className={'p-1'}><Link to={url} className={'w-100'}>
                    <Button className={'w-100'} variant='outline-primary'>Подробнее</Button>
                </Link></Col>}

              </Row>
          </Container>
      </Card.Body>
    )
})

export default CustomCardBody;