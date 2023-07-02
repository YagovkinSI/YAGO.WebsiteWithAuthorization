import * as React from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { authorizationActionCreators } from '../store/Authorization';
import { useNavigate } from 'react-router';

const Logout: React.FC = () => {
    const state = useAppSelector(state => state.authorizationReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!state.data.isAuthorized)
            navigate('/');
        else if (!state.isLoading)
            authorizationActionCreators.logout(dispatch)
    });

    return (
        <div>
            <h1>Выход...</h1>
        </div>
    )
};

export default Logout;
