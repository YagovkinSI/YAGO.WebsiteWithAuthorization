import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { localhostApi } from '../services/localhostApi';
import { counterReducer } from './Counter';
import { authorizationSlice } from './Authorization';

// Всякий раз, когда отправляется (dispatched) действие (action), Redux будет обновлять каждое 
// свойство состояния приложения (application state property) верхнего уровня, используя 
// редюсер (reducer) с соответствующим именем. Важно, чтобы имена точно совпадали, и чтобы 
// reducer (reducer) работал с соответствующим типом свойства ApplicationState.
const rootReducer = combineReducers({
    counter: counterReducer,
    [localhostApi.reducerPath]: localhostApi.reducer,
    authorizationReducer: authorizationSlice.reducer
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        // Добавление промежуточного ПО (middleware) API включает кэширование, аннулирование, опрос и другие полезные функции rtk-query.
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(localhostApi.middleware),
    })
}

// Эти типы можно использовать в качестве подсказки для создателей действий (action creators), 
// чтобы его параметры 'dispatch' and 'getState' имели правильные типы в соответствии с вашим хранилищем (store).
export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

//создаём хуки (hook) для удосбтва работы с типизированными типами
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;