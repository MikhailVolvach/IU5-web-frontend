import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useUsersList = () => useSelector((state: RootState) => state.usersList);