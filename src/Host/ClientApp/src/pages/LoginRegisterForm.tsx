import * as React from 'react';
import { Avatar, Box, Button, CssBaseline, TextField, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router';
import { useLoginMutation, useRegisterMutation } from '../features/Authorization';
import ErrorField from '../shared/ErrorField';
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface ILoginRegisterProps {
    isLogin: boolean
}

interface LoginRegisterFormState {
    userName: string,
    password: string,
    passwordConfirm: string,
}

const LoginRegister: React.FC<ILoginRegisterProps> = (props) => {
    const isLogin = props.isLogin;
    const name = isLogin ? 'Вход' : 'Регистрация';
    const navigate = useNavigate();

    const [useMutation, { data, isLoading, error }] = isLogin
        ? useLoginMutation()
        : useRegisterMutation();

    React.useEffect(() => {
        if (data?.isAuthorized)
            navigate('/');
    });

    const validationSchema = Yup.object().shape({
        userName: Yup.string()
            .required('Введите логин')
            .min(4, 'Логин должен содержать не менее 4 символов')
            .max(12, 'Логин должен содержать не более 12 символов')
            .matches(/^[a-zA-Z0-9]+$/, 'Логин может содержать только латинские буквы и цифры'),
        password: Yup.string()
            .required('Введите пароль')
            .min(6, 'Пароль должен содержать не менее 6 символов')
            .matches(/[a-z]/, 'Пароль должен содержать строчную латинскую букву')
            .matches(/[A-Z]/, 'Пароль должен содержать заглавную латинскую букву')
            .matches(/[0-9]/, 'Пароль должен содержать цифру'),
        passwordConfirm: isLogin
            ? Yup.string()
            : Yup.string()
                .required('Введите пароль ещё раз')
                .oneOf([Yup.ref('password'), ''], 'Пароли не совпадают'),
    })

    const formik = useFormik({
        initialValues: {
            userName: '',
            password: '',
            passwordConfirm: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values: LoginRegisterFormState) => {
            useMutation(values)
        },
    });

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
                value={formik.values.userName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.userName && Boolean(formik.errors.userName)}
                helperText={formik.touched.userName && formik.errors.userName}

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
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
        )
    }

    const confirmPasswordInput = () => {
        return (
            <TextField
                margin="normal"
                required
                fullWidth
                name="passwordConfirm"
                label="Повторите пароль"
                type="password"
                id="passwordConfirm"
                autoComplete="current-password"
                value={formik.values.passwordConfirm}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
                helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
            />
        )
    }

    const renderForm = () => {
        return (
            <form onSubmit={formik.handleSubmit}>
                {loginInput()}
                {passwordInput()}
                {isLogin ? <></> : confirmPasswordInput()}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    disabled={isLoading}
                    sx={{ mt: 3, mb: 2 }}
                >
                    {isLoading
                        ? 'Загрузка...'
                        : name}
                </Button>
            </form>
        )
    }

    return (
        <div>
            <ErrorField title='Ошибка авторизации' error={error} />
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
                <Box sx={{ mt: 1 }}>
                    {renderForm()}
                </Box>
            </Box>
        </div>
    )
};

export default LoginRegister;
