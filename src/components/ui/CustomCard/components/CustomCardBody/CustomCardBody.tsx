import { FC, memo } from "react";
import { Button, Card, Col, Container, PlaceholderButton, Row } from "react-bootstrap";
import { useCreateCardButtonContent } from "utils/useCreateCardButtonContent.tsx";
import { EDataFileTypeField } from "config/enums.ts";
import CustomCardText from "ui/CustomCard/components/CustomCardText";
import { Link } from "react-router-dom";
import CustomSpinner from "ui/CustomSpinner";

export interface ICustomCardBody {
  title?: string;
  text?: string;
  buttonsArr: string[];
  textType?: EDataFileTypeField;
  url?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  withLoader: boolean;
}

const CustomCardBody: FC<ICustomCardBody> = memo(({ title = '', text = '', buttonsArr, textType = EDataFileTypeField.TEXT_FILE, url = '', onClick = () => { return }, withLoader }) => {
  const buttonColSm = Math.floor(12 / (buttonsArr.length + 1));
  const isImage = textType === EDataFileTypeField.IMAGE;
  
  
  return (
    <Card.Body className={'w-100'}>
      <Card.Title>{title}</Card.Title>
      {!text && withLoader && !isImage && <CustomSpinner />}
      {text && <CustomCardText text={text} textType={textType} />}
      <Container>
        <Row xs={1} sm={buttonsArr.length + 1} className={'d-flex justify-content-center'}>
          {buttonsArr.map((button) => {
            const buttonContent = useCreateCardButtonContent(button)
            return <Col key={button + buttonContent} xs={12} sm={buttonColSm} className={'p-1'}>
              {!button ? <PlaceholderButton className={'w-100'} variant="primary" xs={5} /> :
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