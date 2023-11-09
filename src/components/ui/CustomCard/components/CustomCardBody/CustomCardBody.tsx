import {FC, memo} from "react";
import {Button, Card, Placeholder, PlaceholderButton } from "react-bootstrap";

export interface ICustomCardBody {
    title?: string;
    text?: string;
    buttonText?: string;
    loading: boolean;
    buttonsArr:
}

const CustomCardBody: FC<ICustomCardBody> = memo(({ title = "", text = "", buttonText = "" , loading=false}) => {
    return (
      <Card.Body>
          {loading || !title ? <Placeholder as={Card.Title} animation="glow"><Placeholder xs={6} /></Placeholder> : <Card.Title>{title}</Card.Title>}
          {loading || !text ? <Placeholder as={Card.Text} animation="glow">
                <Placeholder xs={10}/>{' '}
                <Placeholder xs={10} /></Placeholder> : <Card.Text>{text}</Card.Text>}
          {loading || !buttonText ? <PlaceholderButton variant="primary" xs={5} /> : <Button variant="primary" >{buttonText}</Button>}
      </Card.Body>
    )




    // {buttonText ? <Button variant="primary">{buttonText}</Button> :
    //   <Placeholder.Button variant="primary" xs={6} />
    // }
    //         }
    //
    //         {title ? <Card.Title>{title}</Card.Title>
    //         : <Placeholder as={Card.Title} animation="glow">
    //             <Placeholder xs={6} />
    //     </Placeholder>}
    //         {text ? <Card.Text>{text}</Card.Text> :
    //         <Placeholder as={Card.Text} animation="glow">
    //             <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
    //             <Placeholder xs={6} /> <Placeholder xs={8} />
    //         </Placeholder>
    //         }
    //         {buttonText ? <Button variant="primary">{buttonText}</Button> :
    //         <Placeholder.Button variant="primary" xs={6} />
    //         }
    //     </Card.Body>
    //     );
})

export default CustomCardBody;