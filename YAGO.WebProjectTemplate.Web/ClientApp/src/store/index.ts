import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';

// Объект состояния (state) верхнего уровня
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
}

// Всякий раз, когда отправляется (dispatched) действие (action), Redux будет обновлять каждое 
// свойство состояния приложения (application state property) верхнего уровня, используя 
// редюсер (reducer) с соответствующим именем. Важно, чтобы имена точно совпадали, и чтобы 
// reducer (reducer) работал с соответствующим типом свойства ApplicationState.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer
};

// Этот тип можно использовать в качестве подсказки для создателей действий (action creators), 
// чтобы его параметры 'dispatch' and 'getState' имели правильные типы в соответствии с вашим хранилищем (store).
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
