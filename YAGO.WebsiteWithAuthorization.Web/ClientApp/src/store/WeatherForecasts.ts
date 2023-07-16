import { localhostApi } from "../services/localhostApi";

export interface WeatherForecast {
    date: string;
    temperatureC: number;
    temperatureF: number;
    summary: string;
}

const extendedApiSlice = localhostApi.injectEndpoints({
    endpoints: builder => ({

        weatherForecasts: builder.query<WeatherForecast[], number>({
            query: () => `weatherforecast`,
        })

    })
})

// Экспорт хуков (hook) для использования в функциональных компонентах (FC), 
// которые автоматически генерируются на основе определенных конечных точек (endpoints)
export const { useWeatherForecastsQuery } = extendedApiSlice