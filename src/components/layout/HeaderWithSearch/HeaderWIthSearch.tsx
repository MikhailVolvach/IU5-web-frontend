import { ChangeEvent, FC, FormEvent, memo, useCallback } from "react";
import { Nav, Form, Button } from "react-bootstrap";
import Header from 'layout/Header';
import {fluid} from 'config/config';
import {EBootstrapColor} from "config/enums.ts";

interface IHeaderWithSearch {
    searchValue?: string;
    onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
    onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

const HeaderWithSearch: FC<IHeaderWithSearch> = memo(({searchValue = '', onSearchChange = () => {return}, onSubmit = () => {return}}) => {
    
  
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
      </Nav>
    </Header> );
  });
  

export default HeaderWithSearch;