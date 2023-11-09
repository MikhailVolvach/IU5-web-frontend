import {FC, memo} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import CustomCardImg from "./components/CustomCardImg";
import CustomCardBody from "./components/CustomCardBody";
import CustomBadge from "ui/CustomBadge";
import {EBootstrapColor} from "config/enums.ts";

export interface ICustomCard {
    title?: string;
    img?: string;
    text?: string;
    buttonText?: string;
    badgeState?: boolean;
    badgeText?: string;
    loading?: boolean;
    isVertical?: boolean;
}

const CustomCard: FC<ICustomCard> = memo(({title = "", img = "", text = "", buttonText = "", badgeState = false, badgeText = "", loading = false, isVertical = true}) => {
    const rowSize = isVertical ? 'auto' : 1;
    const imgColSize = isVertical ? 'auto' : 6;
    return (<Card>
        <CustomBadge loading={loading} cn={'position-absolute top-0 end-0 me-1 mt-1'} bg={ badgeState ? EBootstrapColor.SUCCESS : EBootstrapColor.DANGER } badgeText={badgeText}/>
        <Container>
            <Row xs={1} md={rowSize} className={isVertical ? 'justify-content-center' : ''}>
                <Col xs={12} md={imgColSize}><CustomCardImg  img={img} /></Col>
                <Col xs={12} md={imgColSize}><CustomCardBody loading={loading} title={title} text={text} buttonText={buttonText}/></Col>
            </Row>
        </Container>
    </Card>);
})

export default CustomCard;