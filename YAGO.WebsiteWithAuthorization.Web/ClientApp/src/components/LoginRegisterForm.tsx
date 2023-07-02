import * as React from 'react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { authorizationActionCreators } from '../store/Authorization';
import { Avatar, Box, Button, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router';

interface ILoginRegisterProps {
    isLogin: boolean
}

interface LoginRegisterFormState {
    login: string,
    password: string,
    passwordConfirm: string,
    loginError: string,
    passwordError: string,
    passwordConfirmError: string,
}

const defaultLoginRegisterFormState: LoginRegisterFormState = {
    login: '',
    password: '',
    passwordConfirm: '',
    loginError: '',
    passwordError: '',
    passwordConfirmError: '',
}

const LoginRegister: React.FC<ILoginRegisterProps> = (props) => {
    const state = useAppSelector(state => state.authorizationReducer);
    const dispatch = useAppDispatch();
    const isLogin = props.isLogin;
    const name = isLogin ? 'Вход' : 'Регистрация';
    const [registerFormState, setRegisterFormState] = useState(defaultLoginRegisterFormState);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (state.data.isAuthorized)
            navigate('/');
    });

    const submit = (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();
        if (state.isLoading || !validateForm())
            return;
        if (isLogin)
            authorizationActionCreators.login(
                dispatch,
                registerFormState.login,
                registerFormState.password
            );
        else
            authorizationActionCreators.register(
                dispatch,
                registerFormState.login,
                registerFormState.password,
                registerFormState.passwordConfirm
            );
    }

    const validateForm = () => {
        let success = validateLogin() &&
            validatePassword() &&
            (isLogin || validatePasswordConfirm());
        return success;
    }

    const validateLogin = () => {
        let error = '';
        if (registerFormState.login === '')
            error = 'Введите логин';
        else if (registerFormState.login.length < 4)
            error = 'Логин должен содержать не менее 4 символов';
        else if (registerFormState.login.length > 12)
            error = 'Логин должен содержать не более 12 символов';
        else if (!registerFormState.login.match(/^[a-zA-Z0-9]+$/))
            error = 'Логин может содержать только латинские буквы и цифры';
        else
            return true;
        setRegisterFormState({ ...registerFormState, loginError: error })
        return false;
    }

    const validatePassword = () => {
        let error = '';
        if (registerFormState.password === '')
            error = 'Введите пароль';
        else if (registerFormState.password.length < 6)
            error = 'Пароль должен содержать не менее 6 символов';
        else if (!registerFormState.password.match(/[a-z]/))
            error = 'Пароль должен содержать строчную латинскую букву';
        else if (!registerFormState.password.match(/[A-Z]/))
            error = 'Пароль должен содержать заглавную латинскую букву';
        else if (!registerFormState.password.match(/[0-9]/))
            error = 'Пароль должен содержать цифру';
        else
            return true;
        setRegisterFormState({ ...registerFormState, passwordError: error })
        return false;
    }

    const validatePasswordConfirm = () => {
        if (registerFormState.passwordError === '' &&
            registerFormState.passwordConfirm !== registerFormState.password)
            setRegisterFormState({
                ...registerFormState,
                passwordConfirmError: 'Введенные пароли не совпадают'
            })
        else
            return true;
        return false;
    }

    const loginInput = () => {
        return (
            <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Логин"
                name="userName"
                autoComplete="userName"
                autoFocus
                value={registerFormState.login}
                onChange={e => {
                    setRegisterFormState({
                        ...registerFormState,
                        login: e.target.value,
                        loginError: ''
                    });
                }}
                error={registerFormState.loginError !== ''}
                helperText={registerFormState.loginError}
            />
        )
    }

    const passwordInput = () => {
        return (
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Введите пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={registerFormState.password}
                onChange={e => {
                    setRegisterFormState({
                        ...registerFormState,
                        password: e.target.value,
                        passwordError: '',
                        passwordConfirmError: ''
                    });
                }}
                error={registerFormState.passwordError !== ''}
                helperText={registerFormState.passwordError}
            />
        )
    }

    const confirmPasswordInput = () => {
        return (
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Повторите пароль"
                type="password"
                id="password"
                autoComplete="current-password"
                value={registerFormState.passwordConfirm}
                onChange={e => {
                    setRegisterFormState({
                        ...registerFormState,
                        passwordConfirm: e.target.value,
                        passwordConfirmError: ''
                    });
                }}
                error={registerFormState.passwordConfirmError !== ''}
                helperText={registerFormState.passwordConfirmError}
            />
        )
    }

    return (
        <div>
            <CssBaseline />
            <Box
                sx={{
                    width: '300px',
                    margin: 'auto',
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {name}
                </Typography>
                <Box component="form" onSubmit={submit} noValidate sx={{ mt: 1 }}>
                    {loginInput()}
                    {passwordInput()}
                    {isLogin ? <></> : confirmPasswordInput()}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        disabled={state.isLoading}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        {state.isLoading
                            ? 'Загрузка...'
                            : name}
                    </Button>
                </Box>
            </Box>
        </div>
    )
};

export default LoginRegister;
