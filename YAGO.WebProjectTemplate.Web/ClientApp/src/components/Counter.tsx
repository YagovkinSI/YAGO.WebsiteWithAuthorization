import * as React from 'react';
import * as CounterStore from '../store/Counter';
import { Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../store';


const Counter: React.FC = () => {
    const state = useAppSelector(state => state.counter)
    const actions = CounterStore.counterSlice.actions
    const dispatch = useAppDispatch()

    return (
        <React.Fragment>
            <h1>Счетчик</h1>

            <p>Это простой пример компонента React.</p>

            <p aria-live="polite">Текущее значение: <strong>{state.count}</strong></p>

            <Button variant="contained"
                onClick={() => dispatch(actions.increment())}>
                Увеличить
            </Button>
        </React.Fragment>
    );
};

export default Counter;
