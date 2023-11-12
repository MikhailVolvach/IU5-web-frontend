import {FC, memo} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import CustomCardImg from "./components/CustomCardImg";
import CustomCardBody from "./components/CustomCardBody";
import CustomBadge from "ui/CustomBadge";
import {EBootstrapColor, EIsEncryptedField} from "config/enums.ts";
import {ButtonType} from "config/types.ts";

export interface ICustomCard {
    title?: string;
    img?: string;
    text?: string;
    badgeState?: EIsEncryptedField;
    badgeText?: string;
    loading?: boolean;
    isVertical?: boolean;
    buttonsArr?: ButtonType[];
}

const CustomCard: FC<ICustomCard> = memo(({title = "", img = "", text = "", badgeState = false, loading = false, isVertical = true, buttonsArr = [], badgeText = ''}) => {
    const rowSize = isVertical ? 'auto' : 1;
    const imgColSize = isVertical ? 'auto' : 6;
    return (<Card>
        <CustomBadge loading={loading} cn={'position-absolute top-0 end-0 me-1 mt-1'} bg={ badgeState === EIsEncryptedField.ORIGINAL ? EBootstrapColor.DANGER : EBootstrapColor.SUCCESS } badgeText={badgeText}/>
        <Container>
            <Row xs={1} md={rowSize} className={isVertical ? 'justify-content-center' : ''}>
                <Col xs={12} md={imgColSize}><CustomCardImg  img={img} /></Col>
                <Col xs={12} md={imgColSize}><CustomCardBody loading={loading} title={title} text={text} buttonsArr={buttonsArr}/></Col>
            </Row>
        </Container>
    </Card>);
})

export default CustomCard;