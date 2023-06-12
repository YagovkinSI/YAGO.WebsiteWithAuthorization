import * as React from 'react';
import { AppBar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

interface Link {
    name: string,
    path: string
}

const links: Link[] = [
    { name: 'Главная', path: '/' },
    { name: 'Счетчик', path: '/counter' },
    { name: 'Получение данных', path: '/fetch-data' },
];

const NavMenu: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const onLinkClick = (path: string) => {
        navigate(path);
        handleCloseNavMenu();
    }

    const renderMenu = () => {
        return <Menu
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
    }

    const renderMenuIcon = () => {
        return <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
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
            {renderMenu()}
        </Box>
    }

    const renderLogo = () => {
        return <Typography
            variant={isSm ? 'h6' : 'h5'}
            noWrap
            onClick={() => onLinkClick('/')}
            sx={{
                mr: 2,
                display: 'flex',
                flexGrow: { xs: 1, sm: 0 },
                justifyContent: { xs: 'center', sm: 'start' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer'
            }}
        >
            YAGO
        </Typography>
    }

    const renderLinks = () => {
        return <Box sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}>
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
    }

    return (
        <AppBar position="static">
            <Container>
                <Toolbar disableGutters>
                    {renderMenuIcon()}
                    {renderLogo()}
                    {renderLinks()}
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default NavMenu;
