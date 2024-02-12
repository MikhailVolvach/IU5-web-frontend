import {Button, Container, Form, OverlayTrigger, Popover, Row, Table} from "react-bootstrap";
import Header from "layout/Header";
import { useAppDispatch } from "store/hooks";
import {FC, useCallback, useEffect, useState} from "react";
import { getEncryptionRequestsList, useEncryptionRequestsList } from "store/encryptionRequestsList";
import { useNavigate } from "react-router-dom";
import {useUserAuth} from "store/userAuth";
import {useUsersList} from "store/usersList/selectors.ts";
import {usersList} from "store/usersList";
import {DataEncryptionRequestModel} from "store/models.ts";
import {getEncryptionRequestsListDate} from "store/encryptionRequestsList/getEncryptionRequestsList.ts";

// interface IPopover {
//     list: EncryptionUser[];
// }


interface IDateInputModal {
    title: string;
    callback: (dateStart: Date, dateEnd: Date) => void;
    startDate: Date;
    endDate: Date;
}
const DateInputModal : FC<IDateInputModal> = ({ title, callback, startDate, endDate }) => {
    // const minStartTime = new Date();
    // minStartTime.setHours(0);
    // minStartTime.setMinutes(0);
    // minStartTime.setSeconds(0);
    // minStartTime.setMilliseconds(0);
    // console.log(minStartTime);


    const [ dateStart, setDateStart ] = useState<Date>(startDate);
    const [ dateEnd, setDateEnd ] = useState<Date>(endDate);
    const handleDateSet = useCallback((event) => {
        event.preventDefault();
        callback(dateStart, dateEnd);
    }, [dateStart, dateEnd]);

    return (
      <Popover style={{minWidth: '340px'}}>
          <Popover.Header as="h3">{title}</Popover.Header>
          <Popover.Body style={{width: '340px'}}>
              <Form onSubmit={handleDateSet}>
                  <Form.Group controlId="datePicker" className={'d-flex align-items-center'}>
                      <Form.Control value={dateStart.toISOString().split('T')[0]} onChange={(event) => setDateStart(new Date(event.target.value))} type="date" />&nbsp;—&nbsp;<Form.Control value={dateEnd.toISOString().split('T')[0]} onChange={(event) => setDateEnd(new Date(event.target.value))} type="date" />
                  </Form.Group>
                  <Button type={'submit'} variant={'success'}>Применить</Button>
              </Form>
          </Popover.Body>
      </Popover>
    )
}

const RequestsListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {role } = useUserAuth();
    const {requests} = useEncryptionRequestsList();
    const { users } = useUsersList();

    const [userSelect, setUserSelect] = useState<'Создатель' | string>('Создатель');
    const [ requestsList, setRequestsList ] = useState<DataEncryptionRequestModel[]>(requests || []);
    const [ creationDateFilter, setCreationDateFilter ] = useState<{start: Date, end: Date}>({start: new Date(0), end: new Date()});
    const [ formationDateFilter, setFormationDateFilter ] = useState<{start: Date, end: Date}>({start: new Date(0), end: new Date()});

    const handleRowClick = useCallback((orderId: number | undefined) => {
        navigate(`/request/${orderId}`);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(getEncryptionRequestsList(creationDateFilter));
        }

        const intervalId = setInterval(fetchData, 1000);

        dispatch(usersList());

        return () => clearInterval(intervalId);
    }, [dispatch, creationDateFilter]);

    useEffect(() => {
        if (userSelect === 'Создатель') {
            setRequestsList(requests);
        } else {
            setRequestsList(requests.filter(item => item.user === userSelect));
        }
    }, [userSelect]);

    const handleUserSelect = useCallback((event) => {
        setUserSelect(event.target.value);
    }, []);

    const handleCreationDateFilter = useCallback((start: Date, end: Date) => {
        setCreationDateFilter({start: start, end: end});
        // console.log(start, end);
    }, []);

    // const handleFormationDateFilter = useCallback((start: Date, end: Date) => {
    //     setFormationDateFilter({start: start, end: end});
    //     console.log(start, end);
    // }, []);

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
                                <OverlayTrigger trigger="click" placement="bottom" overlay={() => <DateInputModal startDate={creationDateFilter.start} endDate={creationDateFilter.end} callback={handleCreationDateFilter} title={'Дата создания'} />}>
                                    <Button variant="link">Дата создания</Button>
                                </OverlayTrigger>
                            </th>
                            <th>
                                {/*<OverlayTrigger trigger="click" placement="bottom" overlay={() => <DateInputModal startDate={formationDateFilter.start} endDate={formationDateFilter.end} callback={handleFormationDateFilter} title={'Дата изменения'} />}>*/}
                                {/*    <Button variant="link">Дата изменения</Button>*/}
                                {/*</OverlayTrigger>*/}
                                Дата изменения
                                </th>
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
        </Container>
    );
}

export default RequestsListPage;