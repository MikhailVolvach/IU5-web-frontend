import { Container, Row, Table } from "react-bootstrap";
import Header from "layout/Header";
import { useAppDispatch } from "store/hooks";
import { useCallback, useEffect } from "react";
import { getEncryptionRequestsList, useEncryptionRequestsList } from "store/encryptionRequestsList";
import { Link, useNavigate } from "react-router-dom";


const RequestsListPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {requests, isLoaded} = useEncryptionRequestsList();

    const handleRowClick = useCallback((orderId: number | undefined) => {
        navigate(`/request/${orderId}`);
    }, []);

    useEffect(() => {
        dispatch(getEncryptionRequestsList());
    }, []);

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
                            <th>Дата создания</th>
                            <th>Дата изменения</th>
                            <th>Действие</th>
                            <th>Статус</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((item) => <tr key={item?.id} onClick={() => handleRowClick(item?.id)}>
                            {/* <Link to={`/request/${item?.id}`} > */}
                                <th>{ item?.id }</th>
                                <th>{ item?.creationDate }</th>
                                <th>{ item?.formationDate }</th>
                                <th>{ item?.action }</th>
                                <th>{ item?.workStatus }</th>
                            {/* </Link> */}
                        </tr>)}
                    </tbody>
                </Table>
            </Row>
        </Container>
    );
}

export default RequestsListPage;