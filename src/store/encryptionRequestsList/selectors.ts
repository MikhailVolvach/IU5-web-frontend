import { useSelector } from "react-redux";
import { RootState } from "../types";

export const useEncryptionRequestsList = () => useSelector((state: RootState) => state.encryptionRequestsList);