import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useDataList = () => useSelector((state: RootState) => state.dataList);