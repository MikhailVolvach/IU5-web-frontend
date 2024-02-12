import { ChangeEvent, FC, FormEvent, useCallback, useEffect, useState } from "react";
import { memo } from "react";
import { FloatingLabel, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {loginUser, useUserAuth} from "store/userAuth";
import { useAppDispatch } from "store";

interface ILogin {
  show?: boolean;
  handleClose?: () => void;
}

const Login : FC<ILogin> = memo(({ show = false, handleClose = () => null }) => {
  const dispatch = useAppDispatch();

  const { isLogin } = useUserAuth();

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


  const handleSubmit = useCallback((e : FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;

    // Проверяем валидность формы
    if (!form.checkValidity()) {
      e.stopPropagation();
    } else {
      // @ts-ignore
      dispatch(loginUser({username: e.target[0]?.value, password: e.target[1]?.value}));
    }
  }, []);

  useEffect(() => {
    if (isLogin && show) {
      setUsername('');
      setPassword('');
      handleClose();
      setValidated(true);
    }
  }, [isLogin])


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
            <Form.Control value={username} name="username" type="text" placeholder="Имя пользователя" onChange={handleUsernameChange} autoFocus/>
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