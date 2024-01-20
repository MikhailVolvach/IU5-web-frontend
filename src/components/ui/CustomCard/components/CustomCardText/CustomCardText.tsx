import {FC, useCallback, useState} from 'react';
import {Card} from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import {coy as theme} from "react-syntax-highlighter/dist/esm/styles/prism";
import { EDataType } from 'store/enums';

export interface ICustomCardText {
  textType?: EDataType;
  text?: string;
}

const CustomCardText : FC<ICustomCardText> = ({textType = EDataType.TEXT, text = ''}) => {
  const [seeMore, setSeeMore] = useState(false);

  const handleClickMore = useCallback(() => {
    setSeeMore(true);
  }, []);

  const textToShow = seeMore ? text : text.slice(0, 1000);

  return (
    textType === EDataType.TEXT ? (text && <Card.Text>{textToShow}{text.length > 1000 && <span className={'link-primary'} role="button" onClick={handleClickMore}>...</span>}</Card.Text>) : (
      textType === EDataType.CODE && <SyntaxHighlighter language="javascript" style={theme} wrapLongLines={true}>{text}</SyntaxHighlighter>
    )
  );
};

export default CustomCardText;