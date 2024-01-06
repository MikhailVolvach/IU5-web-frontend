import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import { fluid } from 'config/config';
import DataListPageContent from "./components/DataListPageContent";
import DataListPageHeader from "./components/DataListPageHeader";
import {ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState} from "react";
// import {getMockDataList} from "utils/getMockData.ts";
import HeaderWithSearch from 'layout/HeaderWithSearch';

import { getListPageData, useDataList } from 'store/dataList';
import { useAppDispatch } from 'store/hooks';

export interface IDataListPage {
  searchQuery?: string;
  searchQueryChange?: (value: string) => void;
}

const DataListPage : FC<IDataListPage> = memo(({searchQuery = '', searchQueryChange = () => null}) => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    searchQueryChange(e.target[0]?.value);
  }, []);

  const fetchData = async () => {
    dispatch(getListPageData(searchQuery));
  }

  useEffect(() => {
    fetchData();
  }, [searchQuery, dispatch]);

  const {data, orderId} = useDataList();

  return (
    <Container fluid={fluid}>
      <Row>
        <HeaderWithSearch 
          searchValue={searchValue}
          onSubmit={handleSearchSubmit}
          onSearchChange={handleSearchChange}
          requestId={orderId}
        />
        {/* <DataListPageHeader requestId={orderId} searchValue={searchValue} onSubmit={handleSearchSubmit} onSearchChange={handleSearchChange}/> */}
      </Row>
      <Row>
        <DataListPageContent data={data} />
      </Row>
    </Container>
  );
});

export default DataListPage;
