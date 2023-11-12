import {EBootstrapFluid} from "config/enums.ts";
import { ButtonType } from "./types";

export const fluid = EBootstrapFluid.SM;

export const CardButtonsArr : ButtonType[] = [
    {
        buttonName: 'add',
        buttonContent: <div className={'d-flex flex-nowrap justify-content-center align-content-center'}>Добавить</div>
    },
    {
        buttonName: 'remove',
        buttonContent: <div className={'d-flex flex-nowrap justify-content-center align-items-center'}>Удалить</div>
    }
]