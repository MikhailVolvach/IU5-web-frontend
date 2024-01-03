import {FC, useCallback, useState} from 'react';
import {EDataFileTypeField} from "config/enums.ts";
import {Card} from "react-bootstrap";
import SyntaxHighlighter from "react-syntax-highlighter";
import {coy as theme} from "react-syntax-highlighter/dist/esm/styles/prism";

export interface ICustomCardText {
  textType?: EDataFileTypeField;
  text?: string;
}

const CustomCardText : FC<ICustomCardText> = ({textType = EDataFileTypeField.TEXT_FILE, text = ''}) => {
  const [seeMore, setSeeMore] = useState(false);

  const handleClickMore = useCallback(() => {
    setSeeMore(true);
  }, []);

  const textToShow = seeMore ? text : text.slice(0, 1000);

  return (
    textType === EDataFileTypeField.TEXT_FILE ? (text && <Card.Text>{textToShow}{text.length > 1000 && <span className={'link-primary'} role="button" onClick={handleClickMore}>...</span>}</Card.Text>) : (
      textType === EDataFileTypeField.CODE && <SyntaxHighlighter language="javascript" style={theme} wrapLongLines={true}>{text}</SyntaxHighlighter>
    )
  );
};

export default CustomCardText;