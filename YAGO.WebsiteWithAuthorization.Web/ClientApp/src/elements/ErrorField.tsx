import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { Alert, AlertTitle } from '@mui/material';
import { resetError } from '../store/Authorization';

const ErrorField: React.FC = () => {
    const state = useAppSelector(state => state.authorizationReducer);
    const dispatch = useAppDispatch()

    const emptyComponent = () => {
        return (<></>)
    }

    const alertComponent = () => {
        return (
            <Alert severity="error" onClose={() => { dispatch(resetError()) }} sx={{ mt: '1rem' }}>
                <AlertTitle>Ошибка авторизации</AlertTitle>
                {state.error}
            </Alert >)
    }

    if (state.error == '') {
        return emptyComponent();
    } else {
        return alertComponent();
    }
}

export default ErrorField