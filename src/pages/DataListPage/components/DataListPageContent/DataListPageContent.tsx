import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import CustomCard from "ui/CustomCard";
import React, {FC, memo, useCallback} from "react";
import {getBadgeTextFromState} from "utils/getBadgeTextFromState.ts";
import { CardButtonsArr } from "config/config";
import { DataItem } from "api";
import { useAppDispatch } from "store/hooks";
import { addItemToRequest } from 'store/encryptionRequestItem';

export interface IDataListPageContent {
  data: DataItem[];
}

const DataListPageContent:FC<IDataListPageContent> = memo(({ data }) => {
  const dispatch = useAppDispatch();

  const handleCardClick = useCallback((e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    dispatch(addItemToRequest(`${id}`));
  }, []);
  return (
    <>
      <Container >
        <Row xs={1} sm={1} md={2} lg={3} xl={4} className={'d-flex align-items-stretch'}>
          {!data &&
            Array.from({length: 8}, (_, index) => <Col key={index} className={'text-center gy-4'}>
              <CustomCard />
            </Col>)
          }
          {data && data?.map((dataItem) => (
            <Col key={`id=${dataItem.id};title=${dataItem.title}`} className={'text-center gy-4'}>
              <CustomCard
                title={dataItem.title}
                img={dataItem.img}
                buttonsArr={CardButtonsArr}
                badgeState={dataItem.is_encrypted}
                badgeText={getBadgeTextFromState(dataItem?.is_encrypted)}
                id={dataItem.id}
                onClick={handleCardClick}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
});

export default DataListPageContent;