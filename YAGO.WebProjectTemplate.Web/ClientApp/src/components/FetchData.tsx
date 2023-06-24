import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { WeatherForecast, useWeatherForecastsQuery } from '../store/WeatherForecasts';
import AppTable, { AppTableColumn, AppTableRow } from '../elements/AppTable';

const FetchData: React.FC = () => {
  // получаем значение startDateIndex из текущего URL-адреса, согласно пути маршрута (route).
  const { startDateIndex } = useParams();
  const startDateIndexNum = startDateIndex == null
    ? 0
    : parseInt(startDateIndex, 10) || 0;
  // Использование хука (hook) запроса автоматически извлекает данные и возвращает значения запроса
  const { data, isLoading } = useWeatherForecastsQuery(startDateIndexNum)

  const render = () => {
    return <React.Fragment>
      <h1 id="tabelLabel">Прогноз погоды</h1>
      <p>Этот компонент демонстрирует получение данных с сервера и работу с параметрами URL.</p>
      {renderForecastsTable()}
      {renderPagination()}
    </React.Fragment>
  }

  const renderForecastsTable = () => {
    const columnList: AppTableColumn[] = [
      { title: 'Дата', sx: { width: { xs: '34%', sm: '25%' } } },
      { title: '℃', sx: { width: { xs: '18%', sm: '25%' } } },
      { title: '℉', sx: { width: { xs: '18%', sm: '25%' } } },
      { title: 'Погода', sx: { width: { xs: '30%', sm: '25%' } } },
    ]
    const rowList: AppTableRow[] = data?.map((forecast: WeatherForecast) => {
      return {
        key: forecast.date,
        cells: [
          new Date(Date.parse(forecast.date)).toLocaleDateString(),
          forecast.temperatureC,
          forecast.temperatureF,
          forecast.summary
        ]
      } as AppTableRow
    }) ?? []

    return (

      <AppTable columnList={columnList} rowList={rowList} />
    );
  }

  const navigate = useNavigate()
  const renderPagination = () => {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${startDateIndexNum - 5}`)}>Назад</Button>
        {isLoading && <span>Загрузка...</span>}
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${startDateIndexNum + 5}`)}>Далее</Button>
      </Box>
    );
  }

  return render();
}

export default FetchData;
