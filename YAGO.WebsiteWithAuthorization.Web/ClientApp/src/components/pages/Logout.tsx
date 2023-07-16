import * as React from 'react';
import { useLogoutMutation } from '../../store/Authorization';
import { useNavigate } from 'react-router';
import ErrorField from '../elements/ErrorField';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const [logout, { data, isLoading, error }] = useLogoutMutation()

    React.useEffect(() => {
        if (data != null && !data.isAuthorized)
            navigate('/');
        if (data == null && !isLoading)
            logout()
    });

    return (
        <div>
            <ErrorField title='Ошибка авторизации' error={error} />
            <h1>Выход...</h1>
        </div>
    )
};

export default Logout;
