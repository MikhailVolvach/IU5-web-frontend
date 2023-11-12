import { CardButtonsArr } from "config/config";
import { memo } from "react";
import CustomCard from "ui/CustomCard";
import {ButtonType} from "config/types.ts";

const DataItemPageContent = memo(() => {
    return (
        <CustomCard isVertical={false} buttonsArr={CardButtonsArr.filter((button: ButtonType) => button.buttonName === 'add')} />
    )
});

export default DataItemPageContent;