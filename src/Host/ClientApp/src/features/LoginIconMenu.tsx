import * as React from 'react';
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import getColorFromString from '../shared/ColorHelper';
import { Link } from '../entities/Link';
import { useGetCurrentUserQuery } from '../entities/CurrentUser';

const userProfileLinks: Link[] = [
    { name: 'Выход', path: '/logout' },
];

const guestProfileLinks: Link[] = [
    { name: 'Вход', path: '/login' },
    { name: 'Регистрация', path: '/register' },
];

const LoginIconMenu: React.FC = () => {
    const { data } = useGetCurrentUserQuery()
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate()
    const onLinkClick = (path: string) => {
        navigate(path)
    }

    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: getColorFromString(name),
            },
            children: `${name[0]}`,
        };
    }

    const renderLoginMenuTooltip = () => {
        return (
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
        )
    }

    const renderLoginMenuLinks = () => {
        const userMenuLinks = data?.isAuthorized
            ? userProfileLinks
            : guestProfileLinks;
        return userMenuLinks.map((link) => (
            <MenuItem key={link.name} onClick={() => { onLinkClick(link.path); handleCloseUserMenu() }}>
                <Typography textAlign="center">{link.name}</Typography>
            </MenuItem>
        ))
    }

    const render = () => {
        return (
            <Box sx={{ flexGrow: 0 }}>
                {renderLoginMenuTooltip()}
                <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {renderLoginMenuLinks()}
                </Menu>
            </Box>
        )
    }

    return render();
}

export default LoginIconMenu;
