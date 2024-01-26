import { FC, memo, useCallback, useEffect, useState } from "react";
import {Container, Row, Nav, ButtonGroup, Button, Col} from "react-bootstrap";
import Header from 'layout/Header';
import { useAppDispatch } from 'store/hooks';
import { getEncryptionRequestItem, formRequestItem } from "store/encryptionRequestItem";
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import RequestItemPageData from './components/RequestItemPageData';
import RequestItemPageInfo from './components/RequestItemPageInfo';
import { useUserAuth } from "store/userAuth";

interface IRequestItemPage {
    orderId?: string;
}

const RequestItemPage : FC<IRequestItemPage> = memo(({orderId}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { draftId } = useUserAuth();

    const id = (orderId && orderId !== '-1') ? orderId : draftId;

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getEncryptionRequestItem(id));
        }

        if (!id || +id === -1) return;

        fetchData();
    }, [id]);

    const [selectedTab, setSelectedTab] = useState('info');

    //@ts-ignore
    const handleSelect = useCallback((e) => {
        setSelectedTab(e);
        navigate(e);
    }, []);

    const formRequest = useCallback(() => {
      dispatch(formRequestItem());
      navigate('/');
    }, []);

    return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row>
            <Nav variant="tabs" defaultActiveKey='info' activeKey={selectedTab} onSelect={handleSelect}>
                <Nav.Item>
                    <Nav.Link eventKey='info' onClick={(e) => {e.preventDefault()}}>Информация о заявке</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='service-list'>Список услуг</Nav.Link>
                </Nav.Item>
            </Nav>
            </Row>
            <Row>
                <Routes>
                    <Route path={'info'} element={<RequestItemPageInfo />} />
                    <Route path={'service-list'} element={<RequestItemPageData />} />
                    <Route index element={<Navigate to='info' />}/>
                </Routes>
            </Row>
            <Row className={'mt-4'}>
                <Col sm={3}>
                    <ButtonGroup>
                        <Button onClick={formRequest} variant={'success'}>Сформировать</Button>
                        <Button variant={'danger'}>Удалить</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        </Container>
    );
});

export default RequestItemPage;