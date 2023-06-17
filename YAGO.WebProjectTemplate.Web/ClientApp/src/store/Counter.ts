import { createSlice } from '@reduxjs/toolkit';

// -----------------
// Состояние (state) - определяет тип данных, хранящихся в хранилище (store) Redux.

export interface CounterState {
    count: number;
}

const initialState: CounterState = {
    count: 0
}

// Создаёт редюсер (reducer) для обработки состояния (state) использую срез (slice) RTK 
export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.count++
        },
        decrement(state) {
            state.count--
        }
    }
})
