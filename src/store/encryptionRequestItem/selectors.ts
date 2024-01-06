import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useEncryptionRequestItem = () => useSelector((state: RootState) => state.encryptionRequestItem);