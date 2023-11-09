import Header from "layout/Header";
import {fluid} from 'config/config';
import {Button, Form, Nav} from "react-bootstrap";
import {EBootstrapColor} from "config/enums.ts";
import Icon from "ui/Icon";
import CustomBadge from "ui/CustomBadge";
import {FC} from "react";

interface IDataListPageHeader {
  itemsInCart?: number;
}

const DataListPageHeader: FC<IDataListPageHeader> = ({itemsInCart}) => {
  return (<Header fluid={fluid}>
    <Nav fill className="justify-content-end w-100">
        <Form className={'d-flex'}>
          <Form.Control
            className={'rounded-0 border-end-0 rounded-start-3 w-100'}
            type="text"
            placeholder={'Поиск'}
          />
          <Button type="submit" variant={`outline-${EBootstrapColor.SUCCESS}`} className={'rounded-0 rounded-end-3'}>Поиск</Button>
        </Form>
        <Button href="#cart" className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
          <Icon iconName={itemsInCart ? 'FolderFill' : 'Folder'} size={20} className="d-flex align-content-center me-2"/>Заявка{itemsInCart && <CustomBadge bg={EBootstrapColor.INFO} badgeText={`${itemsInCart}`} cn={'d-flex justify-content-center align-items-center top-0 ms-2'} /> }
        </Button>
    </Nav>
  </Header> );
};

export default DataListPageHeader;