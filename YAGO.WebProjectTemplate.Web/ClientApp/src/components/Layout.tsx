import * as React from 'react';
import { Container } from 'reactstrap';
import NavMenu from './NavMenu';

export interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
    return (
        <React.Fragment>
            <NavMenu />
            <Container>
                {props.children}
            </Container>
        </React.Fragment>
    );
};

export default Layout;