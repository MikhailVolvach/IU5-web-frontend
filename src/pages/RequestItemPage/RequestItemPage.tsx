import { memo, useCallback, useEffect } from "react";
import {Container, Row, ButtonGroup, Button, Col, Form} from "react-bootstrap";
import Header from 'layout/Header';
import { useAppDispatch } from 'store/hooks';
import { getEncryptionRequestItem, formRequestItem, deleteRequestItem, useEncryptionRequestItem } from "store/encryptionRequestItem";
import { EWorkStatus } from 'store/enums';
import {useNavigate, useParams} from "react-router-dom";
import RequestItemPageData from './components/RequestItemPageData';
import RequestItemPageInfo from './components/RequestItemPageInfo';
import { useUserAuth } from "store/userAuth";
import {changeReqStatus} from "store/encryptionRequestItem/getEncryptionRequestItem.ts";

const RequestItemPage = memo(() => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { role , draftId} = useUserAuth();
    const { requestStatus } = useEncryptionRequestItem();

    const currentId = !!id && id !== '-1' ? id : draftId;

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getEncryptionRequestItem(currentId));
        }

        console.log(currentId);
        if (!currentId || +currentId === -1) return;
        
        fetchData();
    }, [currentId, dispatch]);

    const formRequest = useCallback(() => {
      dispatch(formRequestItem());
      navigate('/');
    }, [currentId, dispatch]);
    
    const deleteRequest = useCallback(() => {
      if (!currentId || +currentId === -1) return;
      dispatch(deleteRequestItem(currentId));
      navigate('/');
    }, [currentId, dispatch]);

    // @ts-ignore
  const setReqStatus = useCallback((event) => {
      if (!currentId || +currentId === -1) return;
      dispatch(changeReqStatus({id: currentId, status: event.target.value}));
    }, [currentId, dispatch]);

  return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row className={'d-flex justify-content-end'}>
                {requestStatus === EWorkStatus.DRAFT && role === 1 && <Col sm={'auto'} className={'d-flex justify-content-end pe-0'}>
                    <ButtonGroup>
                        <Button onClick={formRequest} variant={'success'}>Сформировать</Button>
                        <Button onClick={deleteRequest} variant={'danger'}>Удалить</Button>
                    </ButtonGroup>
                </Col>}
                {role !== 1 && <Col sm={'auto'} className={'d-flex justify-content-end pe-0'}>
                    {/*@ts-ignore*/}
                    <Form.Select value={requestStatus} onChange={setReqStatus}>
                        {Object.values(EWorkStatus).map(status => <option value={status}>{status}</option>)}
                    </Form.Select>
                </Col>}
            </Row>
            <Row>
                <RequestItemPageInfo />
            </Row>
            <Row>
                <RequestItemPageData />
            </Row>
        </Container>
    );
});

export default RequestItemPage;