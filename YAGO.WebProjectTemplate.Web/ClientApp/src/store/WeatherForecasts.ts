import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// Состояние (state) - определяет тип данных, хранящихся в хранилище (store) Redux.

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex?: number;
    forecasts: WeatherForecast[];
}

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

// -----------------
// Действия (actions) - Это сериализуемые (следовательно, воспроизводимые) описания переходов состояний.
// Сами по себе они не имеют побочных эффектов; они просто описывают то, что должно произойти.

interface RequestWeatherForecastsAction {
    type: 'REQUEST_WEATHER_FORECASTS';
    startDateIndex: number;
}

interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

// Объявите тип 'размеченный союз' ('discriminated union'). Это гарантирует, что все ссылки на свойства типа ('type') 
// содержат одну из объявленных строк типа (а не любую другую произвольную строку).
type KnownAction = RequestWeatherForecastsAction | ReceiveWeatherForecastsAction;

// ----------------
// Создатели действий (action creators) - это функции, открытые для компонентов UI (UI components), 
// которые вызывают переход состояния (state). Они не изменяют состояние (state) напрямую, 
// но могут иметь внешние побочные эффекты (такие как загрузка данных).

export const actionCreators = {
    requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        // Загружайте данные только в том случае, если их у нас еще нет (и они еще не загружаются)
        if (appState && appState.weatherForecasts && startDateIndex !== appState.weatherForecasts.startDateIndex) {
            fetch(`weatherforecast`)
                .then(response => response.json() as Promise<WeatherForecast[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
                });

            dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// Редюсер (reducer) - для заданного состояния (state) и действия (action) возвращает новое состояние (state).
// Чтобы поддерживать путешествия во времени, это не должно мутировать старое состояние (state).

const unloadedState: WeatherForecastsState = { forecasts: [], isLoading: false };

export const reducer: Reducer<WeatherForecastsState> = (state: WeatherForecastsState | undefined, incomingAction: Action): WeatherForecastsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_WEATHER_FORECASTS':
            return {
                startDateIndex: action.startDateIndex,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_WEATHER_FORECASTS':
            // Принимает входящие данные только в том случае, если они соответствуют самому последнему запросу. 
            // Это гарантирует, что мы правильно обработаем ответы, пришедщие не по порядку.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    forecasts: action.forecasts,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
