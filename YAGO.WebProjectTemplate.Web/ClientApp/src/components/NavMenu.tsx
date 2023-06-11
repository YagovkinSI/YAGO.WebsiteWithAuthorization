import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import './NavMenu.css';

const NavMenu: React.FC = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    interface Link {
        name: string,
        path: string
    }

    const onLinkClick = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    }

    const links: Link[] = [
        { name: 'Главная', path: '/' },
        { name: 'Счетчик', path: '/counter' },
        { name: 'Получение данных', path: '/fetch-data' },
    ];

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        style={{ cursor: 'pointer' }}
                        onClick={() => onLinkClick('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'none', sm: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YAGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', sm: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', sm: 'none' },
                            }}
                        >
                            {links.map((link: Link) => (
                                <MenuItem key={link.path} onClick={() => onLinkClick(link.path)}>
                                    <Typography textAlign="center">{link.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        style={{ cursor: 'pointer' }}
                        onClick={() => onLinkClick('/')}
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', sm: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        YAGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
                        {links.map((link) => (
                            <Button
                                key={link.path}
                                onClick={() => onLinkClick(link.path)}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {link.name}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavMenu;
