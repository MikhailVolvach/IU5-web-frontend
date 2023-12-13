import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import {fluid} from 'config/config';
import DataListPageContent from "./components/DataListPageContent";
import DataListPageHeader from "./components/DataListPageHeader";
import {ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState} from "react";
// import { DataListResType } from "config/types";
// import {getMockDataList} from "utils/getMockData.ts";
import {getListPageData, useData, useDraftId } from "store/dataList";
import {useAppDispatch} from "src/store";

export interface IDataListPage {
  searchQuery?: string;
  searchQueryChange?: (value: string) => void;
}

const DataListPage : FC<IDataListPage> = memo(({searchQuery = '', searchQueryChange = () => null}) => {
  // const [data, setData] = useState<DataListResType | null>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getListPageData(searchQuery));
    console.log(dispatch);
    console.log(getListPageData(searchQuery));
  }, [dispatch])

  const data = useData();
  const draftId = useDraftId();
  console.log(data);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  }, []);

  const handleSearchSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // @ts-ignore
    searchQueryChange(e.target[0]?.value);
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const resp = await fetch(`${API_URL}/data?data_search=${searchQuery}`);
  //
  //     if (resp.ok) {
  //       const newData = await resp.json();
  //       setData(newData);
  //       // setIsLoading(false);
  //     } else {
  //       setData(getMockDataList());
  //     }
  //   }
  //   getData();
  //   }, [searchQuery]);


  return (
    <Container fluid={fluid}>
      <Row>
        <DataListPageHeader requestId={draftId} searchValue={searchValue} onSubmit={handleSearchSubmit} itemsInCart={data?.length} onSearchChange={handleSearchChange}/>
      {/*</Row>*/}
      {/*/!*<Row>*!/*/}
      {/*/!*  <Dropdown  className={'d-flex justify-content-end'}>*!/*/}
      {/*/!*    <Dropdown.Toggle variant={EBootstrapColor.PRIMARY} id="dropdown-basic">*!/*/}
      {/*/!*      Тип файла*!/*/}
      {/*/!*    </Dropdown.Toggle>*!/*/}

      {/*/!*    <Dropdown.Menu>*!/*/}
      {/*/!*      <Dropdown.Item>Action</Dropdown.Item>*!/*/}
      {/*/!*      <Dropdown.Item>Another action</Dropdown.Item>*!/*/}
      {/*/!*      <Dropdown.Item>Something else</Dropdown.Item>*!/*/}
      {/*/!*    </Dropdown.Menu>*!/*/}
      {/*/!*  </Dropdown>*!/*/}
      {/*/!*</Row>*!/*/}
      {/*<Row>*/}
      {/*  <DataListPageContent data={data?.data} />*/}
      </Row>
    </Container>
  );
});

export default DataListPage;