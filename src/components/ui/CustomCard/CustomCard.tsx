import React, {FC, memo, useCallback, useMemo} from 'react';
import {Card, Col, Container, Row} from 'react-bootstrap';
import CustomCardImg from "./components/CustomCardImg";
import CustomCardBody from "./components/CustomCardBody";
import CustomBadge from "ui/CustomBadge";
import {EBootstrapColor, EDataFileTypeField, EIsEncryptedField} from "config/enums.ts";

export interface ICustomCard {
    title?: string;
    img?: string;
    text?: string;
    badgeState?: EIsEncryptedField;
    badgeText?: string;
    isVertical?: boolean;
    id?: number;
    buttonsArr?: string[];
    textType?: EDataFileTypeField;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, id: number) => void;
    withLoader?: boolean;
}

const CustomCard: FC<ICustomCard> = memo(({title = "", img = "", text = "", badgeState = false, isVertical = true, buttonsArr = [], badgeText = '', textType = EDataFileTypeField.TEXT_FILE, id = -1 , onClick = () => null, withLoader = false }) => {
    const rowSize = useMemo(() => isVertical ? '12' : 1, [isVertical]);
    const imgColSize = useMemo(() => isVertical ? '12' : 6, [isVertical]);
    const badgeBg =  useMemo(() => badgeState === EIsEncryptedField.ORIGINAL ? EBootstrapColor.DANGER : EBootstrapColor.SUCCESS, [badgeState]);
    const rowCn = useMemo(() => isVertical ? 'justify-content-center align-items-end h-100' : '', [isVertical]);

    return (<Card className={'h-100'}>
        <CustomBadge cn={'position-absolute top-0 end-0 me-1 mt-1'} bg={ badgeBg } badgeText={badgeText}/>

        <Container className={'h-100'}>
            <Row xs={1} md={rowSize} className={rowCn}>
                <Col xs={12} md={imgColSize} className={'p-2'}><CustomCardImg img={img} /></Col>
                <Col xs={12} md={imgColSize}><CustomCardBody withLoader={withLoader} id={id} title={title} text={text} textType={textType} buttonsArr={buttonsArr} onClick={onClick}/></Col>
            </Row>
        </Container>
    </Card>);
})

export default CustomCard;