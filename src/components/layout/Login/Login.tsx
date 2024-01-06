import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { memo } from "react";
import { FloatingLabel, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TLoginData } from "store/userAuth";

interface ILogin {
  show?: boolean;
  handleClose?: () => void;
  handleFormSubmit?: (loginData: TLoginData) => void;
}

const Login : FC<ILogin> = memo(({show = false, handleClose = () => null, handleFormSubmit = () => null}) => {
  const [validated, setValidated] = useState(false);

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsername(value);
  }, []);

  const handlePasswordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  }, []);


  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Проверяем валидность формы с использованием Bootstrap
    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      
      handleFormSubmit({username: e.target[0]?.value, password: e.target[1]?.value})

      setUsername('');
      setPassword('');

      handleClose();
    }

    setValidated(true);
  }, []);


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Авторизация</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <FloatingLabel
            controlId="floatingUsername"
            label="Имя пользователя"
            className="mb-3"
          >
            <Form.Control value={username} name="username" type="text" placeholder="Имя пользователя" onChange={handleUsernameChange}/>
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingPassword"
            label="Пароль"
            className="mb-3"
          >
            <Form.Control value={password} name='password' type="password" placeholder="Пароль" onChange={handlePasswordChange}/>
          </FloatingLabel>
          <Button variant="primary" type="submit">
            Войти
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
})

export default Login;