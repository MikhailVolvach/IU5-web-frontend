import {FC, memo} from "react";
import { Card } from "react-bootstrap";
import defaultImage from 'assets/default-image.svg';

export interface ICustomCardImg {
    img?: string;
}

const CustomCardImg: FC<ICustomCardImg> = memo(({ img = "" }) => {
    return (
      <Card.Img className={'rounded-2'} variant="top" src={img || defaultImage} />)
})

export default CustomCardImg;