import {FC, memo} from "react";
import { Card } from "react-bootstrap";
import defaultImage from 'svg/default-image.svg';

export interface ICustomCardImg {
    img?: string;
}

const CustomCardImg: FC<ICustomCardImg> = memo(({ img = "" }) => {
    return (
      <Card.Img variant="top" src={img || defaultImage} />)
})

export default CustomCardImg;