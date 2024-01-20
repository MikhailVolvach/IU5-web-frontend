import {FC, memo, PropsWithChildren, useCallback, useEffect, useState} from 'react';
import { Button, ButtonToolbar, Container, Navbar} from "react-bootstrap";
import {EBootstrapColor, EBootstrapFluid} from "config/enums";
import { ICON_SIZE } from 'config/config';
import {Link} from "react-router-dom";
import { useUserAuth, loginUser, TLoginData, authUser, logoutUser } from 'store/userAuth'
import Login from 'layout/Login';
import { useAppDispatch } from 'store/hooks';
import Icon from 'ui/Icon';

interface IHeader extends PropsWithChildren {
    bg?: EBootstrapColor;
    fluid?: EBootstrapFluid;
}

const Header: FC<IHeader> = memo(({bg = EBootstrapColor.LIGHT, fluid = EBootstrapFluid.LG, children}) => {
  const dispatch = useAppDispatch();
  const { isLogin, username, cookie, draftId } = useUserAuth();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleCloseLogin = useCallback(() => {setShowLogin(false)}, []);
  const handleOpenLogin = useCallback(() => {setShowLogin(true)}, []);

  const handleFormSubmit = useCallback((formData : TLoginData) => {
    dispatch(loginUser(formData));
  }, []);

  const handleExitButtonPush = useCallback(() => {
    dispatch(logoutUser());
  }, []);

  const isDraftExists : Boolean = (draftId === null ? false : true);

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
                  to="/draft-request"
                  style={{textDecoration: 'none'}}
                >
                  <Button className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
                    <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={ICON_SIZE} className="d-flex align-content-center me-2"/>Заявка
                  </Button>
                </Link>}

                {isLogin && !isDraftExists && <Button className={'d-flex rounded-3 justify-content-center align-content-center'} variant={`outline-${EBootstrapColor.PRIMARY}`}>
                    <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={ICON_SIZE} className="d-flex align-content-center me-2"/>Заявка
                  </Button>}

                {isLogin && <ButtonToolbar className={'d-flex align-content-center'}>
                <Link 
                  to="/requests"
                  style={{textDecoration: 'none'}}
                >
                  <Button 
                    variant={EBootstrapColor.PRIMARY} 
                    className={'h-100 d-flex flex-wrap rounded-3 justify-content-center align-items-center ms-2'}>
                    <Icon className={'me-2'} size={ICON_SIZE} iconName='PersonCircle'/>
                    {username}
                  </Button>
                  </Link>
                  <Button 
                    variant={EBootstrapColor.DANGER} 
                    className={'h-100 d-flex rounded-3 justify-content-center align-content-center ms-2'}
                    onClick={handleExitButtonPush}
                    >
                    <Icon iconName='BoxArrowRight' size={ICON_SIZE} />
                  </Button>
                </ButtonToolbar>}
                {!isLogin && <><Button variant="primary" onClick={handleOpenLogin}>Войти</Button><Login show={showLogin} handleClose={handleCloseLogin} handleFormSubmit={handleFormSubmit}/></>}
              </Container>
          </Navbar>
    </header>
      );
})

export default Header;