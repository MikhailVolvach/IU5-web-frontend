import { FC, memo, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { Button, ButtonToolbar, Container, Navbar } from "react-bootstrap";
import { EBootstrapColor, EBootstrapFluid } from "config/enums";
import { ICON_SIZE } from 'config/config';
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth, authUser, logoutUser } from 'store/userAuth'
import { useEncryptionRequestItem } from 'store/encryptionRequestItem';
import Login from 'layout/Login';
import { useAppDispatch } from 'store/hooks';
import Icon from 'ui/Icon';
import { EWorkStatus } from 'store/enums';

interface IHeader extends PropsWithChildren {
  bg?: EBootstrapColor;
  fluid?: EBootstrapFluid;
}

const Header: FC<IHeader> = memo(({ bg = EBootstrapColor.LIGHT, fluid = EBootstrapFluid.LG, children }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLogin, username, cookie, draftId } = useUserAuth();
  const { requestStatus } = useEncryptionRequestItem();

  const [showLogin, setShowLogin] = useState<boolean>(false);

  const handleCloseLogin = useCallback(() => { setShowLogin(false) }, []);
  const handleOpenLogin = useCallback(() => { setShowLogin(true) }, []);

  const handleExitButtonPush = useCallback(() => {
    dispatch(logoutUser());
    setShowLogin(false);
  }, []);

  // const isDraftExists: Boolean = (draftId === null && requestStatus !== EWorkStatus.DRAFT ? false : true);
  const isDraftExists: Boolean = (requestStatus === EWorkStatus.DRAFT || draftId) ? true : false;

  const handleDraftLinkClick = useCallback(() => {
    navigate('/draft-request');
  }, []);

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
            <Navbar.Brand color={'#fff'}>Главная</Navbar.Brand>
          </Link>

          {children && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
          {children && <Navbar.Collapse id="basic-navbar-nav">{children}</Navbar.Collapse>}

          {isLogin && <Button disabled={!isDraftExists} onClick={handleDraftLinkClick} className={'d-flex rounded-3 justify-content-center align-content-center'} variant={'outline-' + EBootstrapColor.PRIMARY}>
            <Icon iconName={isDraftExists ? 'FolderFill' : 'Folder'} size={ICON_SIZE} className="d-flex align-content-center me-2" />Заявка
          </Button>}

          {isLogin && <ButtonToolbar className={'d-flex align-content-center'}>
            <Link
              to="/requests"
              style={{ textDecoration: 'none' }}
            >
              <Button
                variant={EBootstrapColor.PRIMARY}
                className={'h-100 d-flex flex-wrap rounded-3 justify-content-center align-items-center ms-2'}>
                <Icon className={'me-2'} size={ICON_SIZE} iconName='PersonCircle' />
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
          {!isLogin && <><Button variant="primary" onClick={handleOpenLogin}>Войти</Button><Login show={showLogin} handleClose={handleCloseLogin} /></>}
        </Container>
      </Navbar>
    </header>
  );
})

export default Header;