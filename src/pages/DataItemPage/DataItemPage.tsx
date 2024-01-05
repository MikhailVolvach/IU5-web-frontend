import {Col, Container, Row} from "react-bootstrap";
import {memo, useEffect} from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import DataItemPageContent from "pages/DataItemPage/components/DataItemPageContent";
import {useLocation, useParams} from "react-router-dom";
import CustomBreadcrumbs from "ui/CustomBreadcrumbs";
// import {getMockDataItem} from "utils/getMockData.ts";
import {useDataItem, getItemPageData} from 'store/dataItem';
import { useAppDispatch } from "store/hooks";
import CustomLoader from 'ui/CustomLoader';


const DataItemPage = memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  const fetchData = async () => {
    if (id) dispatch(getItemPageData(id));
  }

  const { isLoaded, data } = useDataItem();

  console.log(isLoaded);

  useEffect(() => {
    fetchData();
  }, [dispatch, isLoaded]);

  return (
    <Container>
      <Row>
        <DataItemPageHeader />
      </Row>
      { !isLoaded && <Row><Col xs={12}><CustomLoader /></Col></Row>}
      { isLoaded && <Row className={'mb-3'}>
        <CustomBreadcrumbs breadcrumbsStr={pathname} />
      </Row> }
      { isLoaded && <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><DataItemPageContent data={data}/></Col>
        <Col xs={'auto'}></Col>
      </Row>}
    </Container>
  );
});

export default DataItemPage;