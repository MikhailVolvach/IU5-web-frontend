import { useSelector } from 'react-redux';
import { RootState } from '../types';

export const useDataItem = () => useSelector((state: RootState) => state.dataItem);
// export const useDataItem = () => useSelector((state: RootState) => state.dataItem.data);