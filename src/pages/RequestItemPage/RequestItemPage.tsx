import { FC, memo, useCallback, useEffect, useState } from "react";
import {Container, Row, Nav, ButtonGroup, Button, Col, Form} from "react-bootstrap";
import Header from 'layout/Header';
import { useAppDispatch } from 'store/hooks';
import { getEncryptionRequestItem, formRequestItem, deleteRequestItem, useEncryptionRequestItem } from "store/encryptionRequestItem";
import { EWorkStatus } from 'store/enums';
import {Navigate, Route, Routes, useNavigate} from "react-router-dom";
import RequestItemPageData from './components/RequestItemPageData';
import RequestItemPageInfo from './components/RequestItemPageInfo';
import { useUserAuth } from "store/userAuth";
import {changeReqStatus} from "store/encryptionRequestItem/getEncryptionRequestItem.ts";

interface IRequestItemPage {
    orderId?: string;
}

const RequestItemPage : FC<IRequestItemPage> = memo(({orderId = '-1'}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { draftId, role } = useUserAuth();
    const { requestStatus } = useEncryptionRequestItem();

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
    
    const deleteRequest = useCallback(() => {
        dispatch(deleteRequestItem(id));
        navigate('/');
    }, [id]);

    const setReqStatus = useCallback((event) => {
        // console.log(event.target.value);
        console.log(id);
        dispatch(changeReqStatus({id: id, status: event.target.value}));
    }, []);

    return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col className={'ps-0'}>
                    <Nav variant="tabs" defaultActiveKey='info' activeKey={selectedTab} onSelect={handleSelect}>
                        <Nav.Item>
                            <Nav.Link eventKey='info' onClick={(e) => {e.preventDefault()}}>Информация о заявке</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey='service-list'>Список услуг</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                {requestStatus === EWorkStatus.DRAFT && role === 1 && <Col sm={'auto'} className={'d-flex justify-content-end pe-0'}>
                    <ButtonGroup>
                        <Button onClick={formRequest} variant={'success'}>Сформировать</Button>
                        <Button onClick={deleteRequest} variant={'danger'}>Удалить</Button>
                    </ButtonGroup>
                </Col>}
                {role !== 1 && <Col sm={'auto'} className={'d-flex justify-content-end pe-0'}>
                    <Form.Select value={requestStatus} onChange={setReqStatus}>
                        {Object.values(EWorkStatus).map(status => <option value={status}>{status}</option>)}
                    </Form.Select>
                </Col>}
            </Row>
            <Row>
                <Routes>
                    <Route path={'info'} element={<RequestItemPageInfo />} />
                    <Route path={'service-list'} element={<RequestItemPageData />} />
                    <Route index element={<Navigate to='info' />}/>
                </Routes>
            </Row>
        </Container>
    );
});

export default RequestItemPage;