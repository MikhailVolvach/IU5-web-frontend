import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useUserAuth = () => useSelector((state: RootState) => state.userAuth);