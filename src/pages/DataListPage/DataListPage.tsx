import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {API_URL, fluid} from 'config/config';
import DataListPageContent from "./components/DataListPageContent";
import DataListPageHeader from "./components/DataListPageHeader";
import {ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState} from "react";
import {getMockDataList} from "utils/getMockData.ts";
import {DataListResType} from "config/types.ts";

export interface IDataListPage {
  searchQuery?: string;
  searchQueryChange?: (value: string) => void;
}

const DataListPage : FC<IDataListPage> = memo(({searchQuery = '', searchQueryChange = () => null}) => {
  const [data, setData] = useState<DataListResType | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    searchQueryChange(e.target[0]?.value);
  }, []);

  useEffect(() => {
    const getData = async () => {
      const resp = await fetch(`${API_URL}/data?search=${searchQuery}`);

      if (resp.ok) {
        const newData = await resp.json();
        setData(newData);
      } else {
        setData(getMockDataList());
      }
    }
    getData();
    }, [searchQuery]);


  return (
    <Container fluid={fluid}>
      <Row>
        <DataListPageHeader requestId={data?.request_id} searchValue={searchValue} onSubmit={handleSearchSubmit} itemsInCart={data?.data.length} onSearchChange={handleSearchChange}/>
      </Row>
      <Row>
        <DataListPageContent data={data?.data} />
      </Row>
    </Container>
  );
});

export default DataListPage;