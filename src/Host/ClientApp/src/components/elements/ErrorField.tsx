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

    const getErrorText = (error: any): string => {
        if (!error?.data)
            return 'Неизвестная ошибка'

        if (typeof error.data == 'string')
            return error.data;

        if (error.data?.errors) {
            let result = ''
            try {
                Object.values(error.data?.errors).forEach((item: any) => {
                    item.forEach((er: string) => {
                        result = result == ''
                            ? er
                            : result + `. ${er}`
                    })
                })
            }
            catch (e) {
                console.log(e)
            }
            if (result != '')
                return result
        }
        return 'Неизвестная ошибка'
    }

    const alertComponent = () => {
        return (
            <Alert severity="error" sx={{ mt: '1rem' }}>
                <AlertTitle>{props.title}</AlertTitle>
                {getErrorText(props.error)}
            </Alert >)
    }

    if (props.error == null) {
        return emptyComponent();
    } else {
        return alertComponent();
    }
}

export default ErrorField