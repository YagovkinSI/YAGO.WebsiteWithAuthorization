import * as React from 'react';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

// Во время выполнения Redux объединит...
type WeatherForecastProps =
  // ... состояние (state), которое мы запросили из хранилища (store) Redux,
  WeatherForecastsStore.WeatherForecastsState
  // ...плюс создатели действий (action creators), которых мы запросили
  & typeof WeatherForecastsStore.actionCreators;

const FetchData: React.FC<WeatherForecastProps> = (props) => {

  // получаем значение startDateIndex из текущего URL-адреса, согласно пути маршрута (route).
  const { startDateIndex } = useParams();
  const startDateIndexNum = startDateIndex == undefined
    ? 0
    : parseInt(startDateIndex, 10) || 0;

  // хук (hook) запускает указанный внутри код после рендеринга, чтобы синхронизировать компонент с какой-либо системой вне React.
  React.useEffect(() => {
    props.requestWeatherForecasts(startDateIndexNum);
  });

  const renderForecastsTable = () => {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th style={{ width: '25%' }}>Дата</th>
            <th style={{ width: '22%' }}>℃</th>
            <th style={{ width: '22%' }}>℉</th>
            <th style={{ width: '31%' }}>Погода</th>
          </tr>
        </thead>
        <tbody>
          {props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
            <tr key={forecast.date}>
              <td>{new Date(Date.parse(forecast.date)).toLocaleDateString()}</td>
              <td>{forecast.temperatureC}</td>
              <td>{forecast.temperatureF}</td>
              <td>{forecast.summary}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  const renderPagination = () => {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Назад</Link>
        {props.isLoading && <span>Загрузка...</span>}
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Далее</Link>
      </div>
    );
  }

  return (
    <React.Fragment>
      <h1 id="tabelLabel">Прогноз погоды</h1>
      <p>Этот компонент демонстрирует получение данных с сервера и работу с параметрами URL.</p>
      {renderForecastsTable()}
      {renderPagination()}
    </React.Fragment>
  )
}

export default connect(
  // Выбирает, какие свойства состояния (state properties) объединяются в свойства (props) компонента
  (state: ApplicationState) => state.weatherForecasts,
  // Выбирает, какие создатели действий (action creators) объединяются в свойства (props) компонента.
  WeatherForecastsStore.actionCreators
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
