import {FC, memo} from "react";
import { Card, Image } from "react-bootstrap";
import defaultImage from 'assets/default-image.svg';

export interface ICustomCardImg {
    img?: string;
}
// style={{height: '300px', objectFit: 'cover'}}
const CustomCardImg: FC<ICustomCardImg> = memo(({ img = "" }) => {
    return (
      <Card.Img className={'rounded-2'} style={{width: '100%', height: 'auto', objectFit: 'cover'}} variant="top" src={img || defaultImage} />)
})

export default CustomCardImg;