import * as React from 'react';
import Container from '@mui/material/Container';
import NavMenu from '../widgets/NavMenu';

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