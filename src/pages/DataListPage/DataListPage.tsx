import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fluid } from 'config/config';
import DataListPageContent from "./components/DataListPageContent";
import DataListPageHeader from "./components/DataListPageHeader";
import {memo, useEffect, useState} from "react";
import { DataListResType } from "config/types";
import {CardButtonInfo} from "config/enums.ts";

const DataListPage = memo(() => {
  const [data, setData] = useState<DataListResType | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(true);

  console.log(CardButtonInfo['ADD']);
  useEffect(() => {
    const getData = async () => {
      const resp = await fetch('https://localhost/data/');

      if (resp.ok) {
        const newData = await resp.json();
        setData(newData);
        // setIsLoading(false);
      }
    }
    getData();
    }, [])


  return (
    <Container fluid={fluid}>
      <Row>
        <DataListPageHeader itemsInCart={data?.data.length}/>
      </Row>
      <Row>
        <DataListPageContent data={data?.data} />
      </Row>
    </Container>
  );
});

export default DataListPage;