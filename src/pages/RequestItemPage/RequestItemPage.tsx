import { FC, memo, useCallback, useEffect, useState } from "react";
import { Container, Row, Nav } from "react-bootstrap";
import Header from 'layout/Header';
import { useAppDispatch } from 'store/hooks';
import { getEncryptionRequestItem, useEncryptionRequestItem } from "store/encryptionRequestItem";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import RequestItemPageData from './components/RequestItemPageData';
import RequestItemPageInfo from './components/RequestItemPageInfo';


const RequestItemPage : FC = memo(() => {
    const dispatch = useAppDispatch();
    const { state } = useLocation();
    const navigate = useNavigate();

    const { requestData } = useEncryptionRequestItem();

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getEncryptionRequestItem(state.id));
        }

        if (!state.id || state.id === -1) return;

        fetchData();
    }, []);

    const [selectedTab, setSelectedTab] = useState('info');

    //@ts-ignore
    const handleSelect = useCallback((e) => {
        setSelectedTab(e);
        navigate(e);
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
                    <Route path={'service-list'} element={<RequestItemPageData requestData={requestData} />} />
                    <Route index element={<Navigate to='info' />}/>
                </Routes>
            </Row>
        </Container>
    );
});

export default RequestItemPage;