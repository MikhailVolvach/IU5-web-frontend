import {Spinner} from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <Spinner animation="grow" variant="primary" role='status'>
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default CustomSpinner;

