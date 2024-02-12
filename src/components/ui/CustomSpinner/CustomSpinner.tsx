import {Spinner} from "react-bootstrap";

const CustomSpinner = () => {
  return (
    <div className={'w-100 h-100 d-flex justify-content-center'}>
      <Spinner animation="grow" variant="primary" role='status'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default CustomSpinner;

