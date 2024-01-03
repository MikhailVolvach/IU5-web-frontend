import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";
import CustomCard from "ui/CustomCard";
import {DataItemResType} from "config/types.ts";
import React, {FC, memo, useCallback} from "react";
import {getBadgeTextFromState} from "utils/getBadgeTextFromState.ts";
import { CardButtonsArr } from "config/config";

export interface IDataListPageContent {
  data: DataItemResType[] | null | undefined;
}

const DataListPageContent:FC<IDataListPageContent> = memo(({ data }) => {
  const handleCardClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
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
                    loading={false}
                    title={dataItem.title}
                    img={dataItem.img}
                    buttonsArr={CardButtonsArr}
                    badgeState={dataItem.is_encrypted}
                    badgeText={getBadgeTextFromState(dataItem.is_encrypted)}
                    url={`/data/${dataItem.id}`}
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