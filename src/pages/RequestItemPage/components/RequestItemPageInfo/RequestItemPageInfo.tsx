import { memo } from "react";
import { ListGroup } from "react-bootstrap";

import { useEncryptionRequestItem } from "store/encryptionRequestItem";

const RequestItemPageInfo = memo(() => {
    const { request } = useEncryptionRequestItem();

    // const creationDate = new Date(request?.creation_date || '').toLocaleString();
    // const formationDate = new Date(request?.formation_date || '').toLocaleString();

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>ИД: { request?.id }</ListGroup.Item>
            <ListGroup.Item>Дата создания: { request?.creationDate }</ListGroup.Item>
            <ListGroup.Item>Дата изменения: { request.formationDate }</ListGroup.Item>
            <ListGroup.Item>Статус: { request?.workStatus }</ListGroup.Item>
        </ListGroup>)
});

export default RequestItemPageInfo;