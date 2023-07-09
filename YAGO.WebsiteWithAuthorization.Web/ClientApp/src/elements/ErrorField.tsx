import * as React from 'react';
import { Alert, AlertTitle } from '@mui/material';

interface ErrorFieldProps {
    title: string,
    error: any
}

const ErrorField: React.FC<ErrorFieldProps> = (props) => {
    const emptyComponent = () => {
        return (<></>)
    }

    const alertComponent = () => {
        return (
            <Alert severity="error" sx={{ mt: '1rem' }}>
                <AlertTitle>{props.title}</AlertTitle>
                {props.error?.data ?? 'Неизвестная ошибка'}
            </Alert >)
    }

    if (props.error == null) {
        return emptyComponent();
    } else {
        return alertComponent();
    }
}

export default ErrorField