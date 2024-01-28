import RequestItemPage from 'pages/RequestItemPage';
import { useParams } from 'react-router-dom';

const RequestItemPageWithId = () => {
    const { id } = useParams();

    return (
        <RequestItemPage orderId={id} />
    )
}

export default RequestItemPageWithId;