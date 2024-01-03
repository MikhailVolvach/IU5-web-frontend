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
    loading?: boolean;
    isVertical?: boolean;
    url?: string;
    buttonsArr?: string[];
    textType?: EDataFileTypeField;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomCard: FC<ICustomCard> = memo(({title = "", img = "", text = "", badgeState = false, loading = false, isVertical = true, buttonsArr = [], badgeText = '', textType = EDataFileTypeField.TEXT_FILE, url = '' , onClick = () => null}) => {
    const rowSize = useMemo(() => isVertical ? '12' : 1, [isVertical]);
    const imgColSize = useMemo(() => isVertical ? '12' : 6, [isVertical]);
    const badgeBg =  useMemo(() => badgeState === EIsEncryptedField.ORIGINAL ? EBootstrapColor.DANGER : EBootstrapColor.SUCCESS, [badgeState]);
    const rowCn = useMemo(() => isVertical ? 'justify-content-center align-items-end h-100' : '', [isVertical]);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        onClick(e);
    }, []);

    return (<Card className={'h-100'}>
        <CustomBadge loading={loading} cn={'position-absolute top-0 end-0 me-1 mt-1'} bg={ badgeBg } badgeText={badgeText}/>
        {/*<Button onClick={handleDeleteButtonClick} variant={`outline-${EBootstrapColor.DANGER}`} className={'position-absolute top-0 start-0 ms-2 mt-2 rounded-circle p-0 d-flex justify-content-center align-items-center'}><Icon iconName={"X"} size={30} /></Button>*/}
        <Container className={'h-100'}>
            <Row xs={1} md={rowSize} className={rowCn}>
                <Col xs={12} md={imgColSize} className={'p-2'}><CustomCardImg img={img} /></Col>
                <Col xs={12} md={imgColSize}><CustomCardBody url={url} loading={loading} title={title} text={text} textType={textType} buttonsArr={buttonsArr} onClick={handleClick}/></Col>
            </Row>
        </Container>
    </Card>);
})

export default CustomCard;