import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { AppDispatch } from '.';
import { RequestParams, RequestType, requestService } from '../sevices/requestService';

export interface WeatherForecastsState {
    isLoading: boolean;
    startDateIndex: number;
    forecasts: WeatherForecast[];
}

export const initialState: WeatherForecastsState = {
    isLoading: false,
    startDateIndex: 0,
    forecasts: []
}

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const request = requestService.createThunk<WeatherForecast[]>('weatherForecast')

export const weatherForecastsSlice = createSlice({
    name: 'weatherForecast',
    initialState,
    reducers: {
        setStartDateIndex(state, action: PayloadAction<number>) {
            state.forecasts = [],
                state.startDateIndex = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(request.fulfilled.type, (state, action: PayloadAction<WeatherForecast[]>) => {
            state.forecasts = action.payload,
                state.isLoading = false
        })
        builder.addCase(request.pending.type, (state) => {
            state.forecasts = [],
                state.isLoading = true
        })
        builder.addCase(request.rejected.type, (state, action: PayloadAction<string>) => {
            state.forecasts = [],
                state.isLoading = false
        })
    }
});

const requestWeatherForecasts = async (dispatch: AppDispatch, startDateIndex: number) => {
    dispatch(weatherForecastsSlice.actions.setStartDateIndex(startDateIndex));
    const requestParams: RequestParams = {
        path: 'weatherforecast',
        type: RequestType.Get,
        data: {}
    }
    var response = request(requestParams);
    return dispatch(response);
}

export const weatherForecastsActionCreators = { requestWeatherForecasts };
