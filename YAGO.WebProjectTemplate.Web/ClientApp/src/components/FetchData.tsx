import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

// Во время выполнения Redux объединит...
type WeatherForecastProps =
  // ... состояние (state), которое мы запросили из хранилища (store) Redux,
  WeatherForecastsStore.WeatherForecastsState
  // ...плюс создатели действий (action creators), которых мы запросили
  & typeof WeatherForecastsStore.actionCreators
  // ...плюс входящие параметры маршрутизации (routing parameters)
  & RouteComponentProps<{ startDateIndex: string }>;

class FetchData extends React.PureComponent<WeatherForecastProps> {
  // Этот метод вызывается при первом добавлении компонента в документ
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // Этот метод вызывается при изменении параметров маршрутизации (routing parameters)
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Прогноз погоды</h1>
        <p>Этот компонент демонстрирует получение данных с сервера и работу с параметрами URL.</p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  private renderForecastsTable() {
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
          {this.props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
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

  private renderPagination() {
    const prevStartDateIndex = (this.props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (this.props.startDateIndex || 0) + 5;

    return (
      <div className="d-flex justify-content-between">
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Назад</Link>
        {this.props.isLoading && <span>Загрузка...</span>}
        <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Далее</Link>
      </div>
    );
  }
}

export default connect(
  // Выбирает, какие свойства состояния (state properties) объединяются в свойства (props) компонента
  (state: ApplicationState) => state.weatherForecasts,
  // Выбирает, какие создатели действий (action creators) объединяются в свойства (props) компонента.
  WeatherForecastsStore.actionCreators
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
