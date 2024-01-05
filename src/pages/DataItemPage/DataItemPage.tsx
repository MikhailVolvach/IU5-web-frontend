import {Col, Container, Row} from "react-bootstrap";
import {memo, useEffect, useState} from "react";
import DataItemPageHeader from "./components/DataItemPageHeader";
import {useLocation, useParams} from "react-router-dom";
import CustomBreadcrumbs from "ui/CustomBreadcrumbs";
import {useDataItem, getItemPageData} from 'store/dataItem';
import { useAppDispatch } from "store/hooks";
import axios from "axios";
import CustomSpinner from "ui/CustomSpinner";
import { getBadgeTextFromState } from "utils/getBadgeTextFromState";
import { CardButtonsArr } from "config/config";
import CustomCard from "ui/CustomCard";


const DataItemPage = memo(() => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { pathname } = useLocation();

  const [fileData, setFileData] = useState<string>('');

  
  const { isLoaded, data } = useDataItem();

  const getFileData = async () => {   
    if (id == undefined) return;

    if (!data?.file) return;

    if (+id !== data?.id) return;

    console.log(data?.id, id);
    axios.get(data?.file)
        .then((response) => {
            setFileData(response.data);
        })
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id == undefined) return;
        await dispatch(getItemPageData(id));  
        if (isLoaded) getFileData();  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    
  }, [id, dispatch, data.id]);

  if (!isLoaded) {
    return <CustomSpinner />;
  }

  return (
    <Container>
      <Row>
        <DataItemPageHeader />
      </Row>
      <Row className={'mb-3'}>
        <CustomBreadcrumbs breadcrumbsStr={pathname} />
      </Row>
      <Row xs={1}>
        <Col xs={'auto'}></Col>
        <Col xs={12} sm={10}><CustomCard withLoader={true} textType={data?.data_type} text={fileData} img={data?.img} title={data?.title} badgeText={data?.is_encrypted ? getBadgeTextFromState(data.is_encrypted) : ''} badgeState={data?.is_encrypted} isVertical={false} buttonsArr={CardButtonsArr.filter((button: string) => button === 'ADD')} /></Col>
        <Col xs={'auto'}></Col>
      </Row>
    </Container>
  );
});

export default DataItemPage;