import * as React from 'react';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CounterStore from '../store/Counter';
import { Button } from '@mui/material';

type CounterProps =
    CounterStore.CounterState &
    typeof CounterStore.actionCreators;

const Counter: React.FC<CounterProps> = (props) => {
    return (
        <React.Fragment>
            <h1>Счетчик</h1>

            <p>Это простой пример компонента React.</p>

            <p aria-live="polite">Текущее значение: <strong>{props.count}</strong></p>

            <Button variant="contained"
                onClick={() => { props.increment(); }}>
                Увеличить
            </Button>
        </React.Fragment>
    );
};

export default connect(
    (state: ApplicationState) => state.counter,
    CounterStore.actionCreators
)(Counter);
