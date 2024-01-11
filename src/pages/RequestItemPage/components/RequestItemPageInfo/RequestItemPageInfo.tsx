import { memo } from "react";
import { ListGroup } from "react-bootstrap";

import { useEncryptionRequestItem } from "store/encryptionRequestItem";

const RequestItemPageInfo = memo(() => {
    const { request } = useEncryptionRequestItem();

    return (
        <ListGroup variant="flush">
            <ListGroup.Item>ИД: { request.id }</ListGroup.Item>
            <ListGroup.Item>Дата создания: { request.creation_date }</ListGroup.Item>
            <ListGroup.Item>Дата изменения: { request.formation_date }</ListGroup.Item>
            <ListGroup.Item>Статус: { request.work_status }</ListGroup.Item>
        </ListGroup>)
});

export default RequestItemPageInfo;