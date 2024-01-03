import Header from "layout/Header";
import {fluid} from 'config/config';
import {Button, Form, Nav} from "react-bootstrap";
import {EBootstrapColor} from "config/enums.ts";
import Icon from "ui/Icon";
import {ChangeEvent, FC, FormEvent, memo, useCallback} from "react";

interface IDataListPageHeader {
  itemsInCart?: number;
  searchValue?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  requestId?: number | null;
}

const DataListPageHeader: FC<IDataListPageHeader> = memo(({requestId = -1, searchValue = '', onSearchChange = () => {return}, onSubmit = () => {return}}) => {
  const isDraftExists : Boolean = (requestId === -1 ? false : true);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  }, []);

  return (<Header fluid={fluid}>
    <Nav fill className="justify-content-end w-100">
        <Form className={'d-flex mb-2 mb-sm-0 me-sm-2'} onSubmit={handleSubmit}>
          <Form.Control
            className={'rounded-0 border-end-0 rounded-start-3 w-100'}
            type="text"
            placeholder={'Поиск'}
            value={searchValue}
            onChange={handleSearchChange}
          />
          <Button type="submit" variant={`outline-${EBootstrapColor.SUCCESS}`} className={'rounded-0 rounded-end-3'}>Поиск</Button>
        </Form>
        <Button href="#cart" className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
          <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={20} className="d-flex align-content-center me-2"/>Заявка
        </Button>
    </Nav>
  </Header> );
});

export default DataListPageHeader;