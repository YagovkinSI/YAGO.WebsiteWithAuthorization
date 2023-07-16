import * as React from 'react';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store';
import { counterActionIncrement } from '../../store/Counter';

const Counter: React.FC = () => {
    const state = useAppSelector(state => state.counter)
    const dispatch = useAppDispatch()

    const render = () => {
        return (
            <React.Fragment>
                <h1>Счетчик</h1>
                <p>Это простой пример компонента React.</p>
                <p aria-live="polite">Текущее значение: <strong>{state.count}</strong></p>
                <Button variant="contained"
                    onClick={() => dispatch(counterActionIncrement())}>
                    Увеличить
                </Button>
            </React.Fragment>
        )
    }

    return render();
};

export default Counter;
