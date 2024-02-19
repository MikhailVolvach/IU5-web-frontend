import {Button, Container, Form, Modal, Row, Table} from "react-bootstrap";
import Header from "layout/Header";
import { useAppDispatch } from "store/hooks";
import {FC, useCallback, useEffect, useState} from "react";
import { getEncryptionRequestsList, useEncryptionRequestsList, setDateStart, setDateEnd } from "store/encryptionRequestsList";
import { useNavigate } from "react-router-dom";
import {useUserAuth} from "store/userAuth";
import {useUsersList} from "store/usersList/selectors.ts";
import {usersList} from "store/usersList";
import {DataEncryptionRequestModel} from "store/models.ts";

interface IDateInputModal {
    title: string;
    callback: (ds: string, de: string, isShow: boolean) => void;
    startDate: string;
    endDate: string;
    isShow: boolean;
}

const DateInputModal : FC<IDateInputModal> = ({ title, callback, startDate, endDate, isShow }) => {
    const [ ds, setDs ] = useState<string>(startDate);
    const [ de, setDe ] = useState<string>(endDate);
    // @ts-ignore
    const handleDateSet = useCallback((event) => {
        event.preventDefault();
        callback(ds, de, false);
    }, [ds, de]);

    return (
      <Modal show={isShow} onHide={() => callback(ds, de, false)}>
              <Modal.Header closeButton>
                  <Modal.Title>{title}</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                  <Form onSubmit={handleDateSet}>
                      <Form.Group controlId="datePicker" className={'d-flex align-items-center mb-2'}>
                          <Form.Control value={ds.split('T')[0]} onChange={(event) => setDs(new Date(event.target.value).toISOString())} type="date" />&nbsp;—&nbsp;<Form.Control value={de.split('T')[0]} onChange={(event) => setDe(new Date(event.target.value).toISOString())} type="date" />
                      </Form.Group>
                      <Button type={'submit'} variant={'success'}>Применить</Button>
                  </Form>
              </Modal.Body>
      </Modal>
    )
}

const RequestsListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {role } = useUserAuth();
    const {requests, dateStart, dateEnd} = useEncryptionRequestsList();
    const { users } = useUsersList();

    const [userSelect, setUserSelect] = useState<'Создатель' | string>('Создатель');
    const [ requestsList, setRequestsList ] = useState<DataEncryptionRequestModel[]>(requests || []);
    const [ creationDateFilter, setCreationDateFilter ] = useState<{start: string, end: string}>({start: new Date(dateStart).toISOString(), end: new Date(dateEnd).toISOString()});
    const [ showModal, setShowModal ] = useState(false);

    const handleRowClick = useCallback((orderId: number | undefined) => {
        navigate(`/request/${orderId}`);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getEncryptionRequestsList(creationDateFilter));
        }

        const intervalId = setInterval(fetchData, 1000);

        if (!!role && role !== 1) dispatch(usersList());

        return () => clearInterval(intervalId);
    }, [dispatch, creationDateFilter]);

    useEffect(() => {
        if (userSelect === 'Создатель') {
            setRequestsList(requests);
        } else {
            setRequestsList(requests.filter(item => item.user === userSelect));
        }
    }, [userSelect]);
    // @ts-ignore
    const handleUserSelect = useCallback((event) => {
        setUserSelect(event.target.value);
    }, []);

    const handleCreationDateFilter = useCallback((start: string, end: string, isShow: boolean) => {
        dispatch(setDateStart(start));
        dispatch(setDateEnd(end));
        setShowModal(isShow);
        setCreationDateFilter({start: start, end: end});
    }, []);

    const handleModalOpen = useCallback(() => {
        setShowModal(true);
    }, []);

    const dataToShow = userSelect === 'Создатель' ? requests : requestsList;

    return (
        <Container>
            <Row>
                <Header />
            </Row>
            <Row>
                <Table>
                    <thead>
                        <tr>
                            <th>ИД Заявки</th>
                            {role !== 1 && <th>
                                <Form.Select size='sm' value={userSelect} onChange={handleUserSelect}>
                                    <option value={'Создатель'}>Создатель</option>
                                    {!!users && users.map((user) => <option value={user.username}>{user.username}</option>)}
                                </Form.Select>
                            </th>}
                            <th>
                                <Button variant="link" onClick={handleModalOpen}>Дата создания</Button>
                            </th>
                            <th>Дата изменения</th>
                            <th>Действие</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!!dataToShow && dataToShow.map((item) => <tr key={item?.id} onClick={() => handleRowClick(item?.id)}>
                                <th>{ item?.id }</th>
                                {role !== 1 && <th>{item?.user}</th>}
                                <th>{ item?.creationDate }</th>
                                <th>{ item?.formationDate }</th>
                                <th>{ item?.action }</th>
                                <th>{ item?.workStatus }</th>
                        </tr>)}
                    </tbody>
                </Table>
            </Row>
            <DateInputModal startDate={creationDateFilter.start} endDate={creationDateFilter.end} callback={handleCreationDateFilter} title={'Дата создания'} isShow={showModal} />
        </Container>
    );
}

export default RequestsListPage;