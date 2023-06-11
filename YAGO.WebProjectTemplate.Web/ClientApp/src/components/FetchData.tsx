import * as React from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import { Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

// Во время выполнения Redux объединит...
type WeatherForecastProps =
  // ... состояние (state), которое мы запросили из хранилища (store) Redux,
  WeatherForecastsStore.WeatherForecastsState
  // ...плюс создатели действий (action creators), которых мы запросили
  & typeof WeatherForecastsStore.actionCreators;

const FetchData: React.FC<WeatherForecastProps> = (props) => {
  const navigate = useNavigate();

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
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ width: '25%' }}>Дата</StyledTableCell>
              <StyledTableCell style={{ width: '22%' }}>℃</StyledTableCell>
              <StyledTableCell style={{ width: '22%' }}>℉</StyledTableCell>
              <StyledTableCell style={{ width: '31%' }}>Погода</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) => (
              <StyledTableRow
                key={forecast.date}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {new Date(Date.parse(forecast.date)).toLocaleDateString()}
                </StyledTableCell>
                <StyledTableCell>{forecast.temperatureC}</StyledTableCell>
                <StyledTableCell>{forecast.temperatureF}</StyledTableCell>
                <StyledTableCell>{forecast.summary}</StyledTableCell>
              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  const renderPagination = () => {
    const prevStartDateIndex = (props.startDateIndex || 0) - 5;
    const nextStartDateIndex = (props.startDateIndex || 0) + 5;

    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${prevStartDateIndex}`)}>Назад</Button>
        {props.isLoading && <span>Загрузка...</span>}
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${nextStartDateIndex}`)}>Далее</Button>
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
