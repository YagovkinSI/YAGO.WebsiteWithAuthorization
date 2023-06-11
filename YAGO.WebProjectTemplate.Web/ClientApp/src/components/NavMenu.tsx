import * as React from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export default class NavMenu extends React.PureComponent<{}, { isOpen: boolean }> {
    public state = {
        isOpen: false
    };

    public render() {
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm border-bottom box-shadow mb-3" light>
                    <Container>
                        <NavbarBrand tag={Link} to="/">YAGO Web Project Template</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={this.state.isOpen} navbar>
                            <ul className="navbar-nav flex-grow">
                                {this.renderNavLink('/', 'Home')}
                                {this.renderNavLink('/counter', 'Counter')}
                                {this.renderNavLink('/fetch-data', 'Fetch data')}
                            </ul>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }

    private toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    private renderNavLink(path: string, name: string) {
        return (
            <NavItem>
                <NavLink
                    tag={Link}
                    className="text-dark"
                    to={path}
                    onClick={() => { this.setState({ isOpen: false }) }}>
                    {name}
                </NavLink>
            </NavItem>
        )
    }
}