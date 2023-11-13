import { CardButtonsArr } from "config/config";
import {FC, memo} from "react";
import CustomCard from "ui/CustomCard";
import {DataItemResType} from "config/types.ts";
import {getBadgeTextFromState} from "utils/getBadgeTextFromState.ts";

export interface IDataItemPageContent {
    data?: DataItemResType;
    text?: string;
}

const DataItemPageContent : FC<IDataItemPageContent> = memo(({data , text}) => {
    return (
        <CustomCard textType={data?.data_type} text={text} img={data?.img} title={data?.title} badgeText={data?.is_encrypted ? getBadgeTextFromState(data.is_encrypted) : ''} badgeState={data?.is_encrypted} isVertical={false} buttonsArr={CardButtonsArr.filter((button: string) => button === 'ADD')} />
    )
});

export default DataItemPageContent;