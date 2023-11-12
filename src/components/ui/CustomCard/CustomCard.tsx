import {FC, memo, useMemo} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import CustomCardImg from "./components/CustomCardImg";
import CustomCardBody from "./components/CustomCardBody";
import CustomBadge from "ui/CustomBadge";
import {EBootstrapColor, EIsEncryptedField} from "config/enums.ts";

export interface ICustomCard {
    title?: string;
    img?: string;
    text?: string;
    badgeState?: EIsEncryptedField;
    badgeText?: string;
    loading?: boolean;
    isVertical?: boolean;
    // buttonsArr?: ButtonType[];
    buttonsArr?: string[];
}

const CustomCard: FC<ICustomCard> = memo(({title = "", img = "", text = "", badgeState = false, loading = false, isVertical = true, buttonsArr = [], badgeText = ''}) => {
    const rowSize = useMemo(() => isVertical ? 'auto' : 1, [isVertical]);
    const imgColSize = useMemo(() => isVertical ? 'auto' : 6, [isVertical]);
    const badgeBg =  useMemo(() => badgeState === EIsEncryptedField.ORIGINAL ? EBootstrapColor.DANGER : EBootstrapColor.SUCCESS, [badgeState]);
    const rowCn = useMemo(() => isVertical ? 'justify-content-center' : '', [isVertical]);

    return (<Card>
        <CustomBadge loading={loading} cn={'position-absolute top-0 end-0 me-1 mt-1'} bg={ badgeBg } badgeText={badgeText}/>
        <Container>
            <Row xs={1} md={rowSize} className={rowCn}>
                <Col xs={12} md={imgColSize} className={'p-2'}><CustomCardImg  img={img} /></Col>
                <Col xs={12} md={imgColSize}><CustomCardBody loading={loading} title={title} text={text} buttonsArr={buttonsArr}/></Col>
            </Row>
        </Container>
    </Card>);
})

export default CustomCard;