import Header from "layout/Header";
import {API_URL, fluid} from 'config/config';
import {Button, Form, Nav} from "react-bootstrap";
import {EBootstrapColor} from "config/enums.ts";
import Icon from "ui/Icon";
import CustomBadge from "ui/CustomBadge";
import {ChangeEvent, FC, FormEvent, memo, useCallback, useEffect, useState} from "react";

interface IDataListPageHeader {
  itemsInCart?: number;
  searchValue?: string;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  onSearchChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  requestId?: number;
}

const DataListPageHeader: FC<IDataListPageHeader> = memo(({requestId= 0, searchValue = '', onSearchChange = () => {return}, onSubmit = () => {return}}) => {
  const [itemsInCart, setItemsInCart] = useState<number>(0);

  const handleSearchChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event);
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    onSubmit(event);
  }, []);

  useEffect(() => {
    const getReq = async () => {
      const resp = await fetch(`${API_URL}/encryption-requests/${requestId}`);

      if (resp.ok) {
        const respData = await resp.json();
        setItemsInCart(respData.data.length);
      } else {
        setItemsInCart(0);
      }
    }

    getReq();
  }, [requestId]);

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
          <Icon iconName={itemsInCart > 0 ? 'FolderFill' : 'Folder'} size={20} className="d-flex align-content-center me-2"/>Заявка{itemsInCart > 0 && <CustomBadge bg={EBootstrapColor.INFO} badgeText={`${itemsInCart}`} cn={'d-flex justify-content-center align-items-center top-0 ms-2'} /> }
        </Button>
    </Nav>
  </Header> );
});

export default DataListPageHeader;