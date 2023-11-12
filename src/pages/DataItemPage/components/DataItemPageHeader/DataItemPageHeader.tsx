import { fluid } from "config/config";
import Header from "layout/Header";
import { memo } from "react";

const DataItemPageHeader = memo(() => {
    return <Header fluid={ fluid }/>;
});

export default DataItemPageHeader;