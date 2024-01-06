import { ChangeEvent, FC, FormEvent, memo, useCallback } from "react";
import HeaderWithSearch from "layout/HeaderWithSearch";
import { fluid } from "config/config";
import { EBootstrapColor } from "config/enums";
import Header from "layout/Header";
import { Nav, Button, Form } from "react-bootstrap";
import Icon from "ui/Icon";

interface IDataListPageHeader {
  searchValue?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  requestId?: number | null;
}

const DataListPageHeader: FC<IDataListPageHeader> = memo(({requestId = -1, searchValue = '', onSearchChange = () => {return}, onSubmit = () => {return}}) => {

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  }, []);

  return (
  <HeaderWithSearch 
      searchValue={searchValue}
      onSubmit={handleSubmit}
      onSearchChange={handleSearchChange}
      requestId={requestId}
      />
      );
});

export default DataListPageHeader;