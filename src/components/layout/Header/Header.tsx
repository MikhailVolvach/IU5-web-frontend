import {FC, memo, PropsWithChildren, useCallback, useEffect, useState} from 'react';
import {Badge, Button, Container, Figure, Image, Navbar} from "react-bootstrap";
import {EBootstrapColor, EBootstrapFluid} from "config/enums.ts";
import {Link} from "react-router-dom";
import { useUserAuth, loginUser, TLoginData, authUser } from 'store/userAuth'
import Login from 'layout/Login';
import { useAppDispatch } from 'store/hooks';
import Icon from 'ui/Icon';
import { useDataList } from 'store/dataList';

interface IHeader extends PropsWithChildren {
    bg?: EBootstrapColor;
    fluid?: EBootstrapFluid;
}

const Header: FC<IHeader> = memo(({bg = EBootstrapColor.LIGHT, fluid = EBootstrapFluid.LG, children}) => {
  const dispatch = useAppDispatch();
  const { isLogin, userData, cookie, orderId } = useUserAuth();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleCloseLogin = useCallback(() => {setShowLogin(false)}, []);
  const handleOpenLogin = useCallback(() => {setShowLogin(true)}, []);

  const handleFormSubmit = useCallback((formData : TLoginData) => {
    dispatch(loginUser(formData));
  }, []);

  const isDraftExists : Boolean = (orderId === null ? false : true);

  useEffect(() => {
    if (cookie) {
      dispatch(authUser());
    }
  }, [cookie]);

  return (
    <header className='w-100 px-0 mb-3'>
          <Navbar expand={fluid} bg={bg} data-bs-theme="light" className={'rounded-3 p-3 shadow-sm'}>
              <Container fluid={fluid}>
                <Link to='/' className={'my-2 link-underline link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-100-hover'}>
                  <Navbar.Brand  color={'#fff'}>Главная</Navbar.Brand>
                </Link>
                {children && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                {children && <Navbar.Collapse id="basic-navbar-nav">{children}</Navbar.Collapse>}

                {isLogin && isDraftExists && 
                <Link 
                  to="/request" 
                  state={{ id: orderId }}
                >
                  <Button className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
                    <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={20} className="d-flex align-content-center me-2"/>Заявка
                  </Button>
                </Link>}

                {isLogin && !isDraftExists && <Button className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
                    <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={20} className="d-flex align-content-center me-2"/>Заявка
                  </Button>}

                {isLogin && <Badge bg={EBootstrapColor.PRIMARY} className={'h-100 d-flex rounded-3 justify-content-center align-content-center'}><Icon className={'me-2'} size={20} iconName='PersonCircle'/> {userData.username}</Badge>}
                {!isLogin && <><Button variant="primary" onClick={handleOpenLogin}>Войти</Button><Login show={showLogin} handleClose={handleCloseLogin} handleFormSubmit={handleFormSubmit}/></>}
              </Container>
          </Navbar>
    </header>
      );
})

export default Header;