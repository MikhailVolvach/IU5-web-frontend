import {CardButtonInfo} from "config/enums.ts";

export const useCreateCardButtonContent = (cardButtonKey: string) => {
  return <div className={'d-flex flex-nowrap justify-content-center align-content-center'}>{ CardButtonInfo[cardButtonKey] }</div>
}