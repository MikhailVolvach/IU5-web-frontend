import React, { FC, memo, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import HeaderWithSearch from 'layout/HeaderWithSearch';
import { useAppDispatch } from 'store/hooks';
import { getEncryptionRequestItem } from "store/encryptionRequestItem";
import { useLocation } from "react-router-dom";


// interface IRequestItemPage {
//     requestId?: number;
// }


const RequestItemPage = memo(() => {
    // const dispatch = useAppDispatch();
    const { state } = useLocation();

    // useEffect(() => {
    //     const fetchData = async () => {
    //         dispatch(getEncryptionRequestItem(state.orderId));
    //     }

    //     fetchData();
    // }, []);

    console.log("PING")

    return (
        <Container>
            <Row>
                <HeaderWithSearch />
            </Row>
            <Row>
                <Col>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Изображение</th>
                                <th>Название</th>
                                <th>Файл</th>
                                <th>Зашифровано</th>
                                <th>Тип данных</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
});

export default RequestItemPage;