import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useData = () => useSelector((state: RootState) => state.dataList.data)
export const useDraftId = () => useSelector((state: RootState) => state.dataList?.orderId);