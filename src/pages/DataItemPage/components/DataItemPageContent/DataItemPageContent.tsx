import { CardButtonsArr } from "config/config";
import {FC, memo, useEffect, useState} from "react";
import CustomCard from "ui/CustomCard";
import {getBadgeTextFromState} from "utils/getBadgeTextFromState.ts";
import { DataItem } from "api";
import axios from "axios";
import {EDataFileTypeField} from "config/enums.ts";

export interface IDataItemPageContent {
    data?: DataItem;
}

const DataItemPageContent : FC<IDataItemPageContent> = memo(({ data }) => {
    const [fileData, setFileData] = useState<string>('');

    const getFileData = async () => {   
        if (!data?.file) return;
        axios.get(data?.file)
            .then((response) => {
                console.log(response);
                setFileData(response.data);
            })

        // if (resp.ok) {
        //   const fileData = await resp.text();
        //   setFileData(fileData);
        // }
      };

    useEffect(() => {
        if (data?.data_type !== EDataFileTypeField.TEXT_FILE && data?.data_type !== EDataFileTypeField.CODE) {
            return;
        }
        getFileData();
        // const getData = async () => {
        //     const req = axios.get(``)
        // }

        // getData();
    }, [data?.file]);

    return (
        <CustomCard textType={data?.data_type} text={fileData} img={data?.img} title={data?.title} badgeText={data?.is_encrypted ? getBadgeTextFromState(data.is_encrypted) : ''} badgeState={data?.is_encrypted} isVertical={false} buttonsArr={CardButtonsArr.filter((button: string) => button === 'ADD')} />
    )
});

export default DataItemPageContent;