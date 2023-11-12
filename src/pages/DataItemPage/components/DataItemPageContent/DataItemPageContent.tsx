import { CardButtonsArr } from "config/config";
import {FC, memo} from "react";
import CustomCard from "ui/CustomCard";
import {DataItemResType} from "config/types.ts";
import {getBadgeTextFromState} from "utils/getBadgeTextFromState.ts";

export interface IDataItemPageContent {
    data?: DataItemResType;
}

const DataItemPageContent : FC<IDataItemPageContent> = memo(({data }) => {
    return (
        <CustomCard img={data?.img} title={data?.title} badgeText={data?.is_encrypted ? getBadgeTextFromState(data.is_encrypted) : ''} badgeState={data?.is_encrypted} isVertical={false} buttonsArr={CardButtonsArr.filter((button: string) => button === 'ADD')} />
    )
});

export default DataItemPageContent;