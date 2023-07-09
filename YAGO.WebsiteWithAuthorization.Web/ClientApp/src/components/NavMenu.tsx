import * as React from 'react';
import { AppBar, Avatar, Box, Button, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserQuery } from '../store/Authorization';
import getColorFromString from '../utils/ColorHelper';

interface Link {
    name: string,
    path: string
}

const links: Link[] = [
    { name: 'Главная', path: '/' },
    { name: 'Счетчик', path: '/counter' },
    { name: 'Получение данных', path: '/fetch-data' },
];

const userProfileLinks: Link[] = [
    { name: 'Выход', path: '/logout' },
];

const guestProfileLinks: Link[] = [
    { name: 'Вход', path: '/login' },
    { name: 'Регистрация', path: '/register' },
];

const NavMenu: React.FC = () => {
    const { data } = useGetCurrentUserQuery()

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const theme = useTheme();
    const isSm = useMediaQuery(theme.breakpoints.up('sm'));

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const render = () => {
        return (
            <AppBar position="static">
                <Container>
                    <Toolbar disableGutters>
                        {renderMenuIcon()}
                        {renderLogo()}
                        {renderLinks()}
                        {renderLoginMenu()}
                    </Toolbar>
                </Container>
            </AppBar >
        )
    }

    const renderMenuIcon = () => {
        return (
            <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="main menu"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(event) => setAnchorElNav(event.currentTarget)}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                {renderMenu()}
            </Box>
        )
    }

    const renderMenu = () => {
        return (
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left', }}
                open={Boolean(anchorElNav)}
                onClose={() => setAnchorElNav(null)}
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
        )
    }

    const navigate = useNavigate()
    const onLinkClick = (path: string) => {
        navigate(path)
        setAnchorElNav(null)
    }

    const renderLogo = () => {
        return (
            <Typography
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
        )
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

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: getColorFromString(name),
            },
            children: `${name[0]}`,
        };
    }

    const renderLoginMenu = () => {
        const userMenuLinks = data?.isAuthorized
            ? userProfileLinks
            : guestProfileLinks;
        return (<Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    {data?.isAuthorized && data?.user?.name != null
                        ? <Avatar {...stringAvatar(data?.user.name)} />
                        :
                        <Avatar>
                            <PersonIcon />
                        </Avatar>
                    }
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                {userMenuLinks.map((link) => (
                    <MenuItem key={link.name} onClick={() => { onLinkClick(link.path); handleCloseUserMenu() }}>
                        <Typography textAlign="center">{link.name}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
        )
    }

    return render();
}

export default NavMenu;
