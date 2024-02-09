import {memo, useEffect} from "react";
import {Container, Row, Table} from "react-bootstrap";
import { fluid } from "config/config.tsx";
import Header from "layout/Header";
import {useAppDispatch} from "store";
import {getListPageData, useDataList} from "store/dataList";

const ModeratorPage = memo(() => {

  const dispatch = useAppDispatch();

  const { data } = useDataList();

  useEffect(() => {
    dispatch(getListPageData());
  }, []);

  return (
    <Container fluid={fluid}>
      <Row>
        <Header />
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <td>ИД</td><td>Название</td><td>Изображение</td><td>Файл</td><td>Тип</td><td>Статус</td><td>Удалено?</td>
            </tr>
          </thead>
          <tbody>
          {!!data && data.map((dataItem) => <tr>
            <td>{dataItem.id}</td>
            <td>{dataItem.title}</td>
            <td>{dataItem.img}</td>
            <td>{dataItem.file}</td>
            <td>{dataItem.dataType}</td>
            <td>{dataItem.isEncrypted}</td>
            <td>{dataItem.isDeleted ? 'Да' : 'Нет'}</td>
          </tr>)}
          </tbody>
        </Table>
      </Row>
    </Container>
  )
});

export default ModeratorPage;