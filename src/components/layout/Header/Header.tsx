import {FC, memo, PropsWithChildren} from 'react';
import {Container, Navbar} from "react-bootstrap";
import {EBootstrapColor, EBootstrapFluid} from "config/enums.ts";
import {Link} from "react-router-dom";

interface IHeader extends PropsWithChildren {
    bg?: EBootstrapColor;
    fluid?: EBootstrapFluid;
}

const Header: FC<IHeader> = memo(({bg = EBootstrapColor.LIGHT, fluid = EBootstrapFluid.LG, children}) => {
    return (
      <header className='w-100 px-0 mb-3'>
            <Navbar expand={fluid} bg={bg} data-bs-theme="light" className={'rounded-3 p-3 shadow-sm'}>
                <Container fluid={fluid}>
                  <Link to='/' className={'my-2 link-underline link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-100-hover'}>
                    <Navbar.Brand  color={'#fff'}>Главная</Navbar.Brand>
                  </Link>
                  {children && <Navbar.Toggle aria-controls="basic-navbar-nav" />}
                  {children && <Navbar.Collapse id="basic-navbar-nav">{children}</Navbar.Collapse>}
                </Container>
            </Navbar>
      </header>
        );
})

export default Header;