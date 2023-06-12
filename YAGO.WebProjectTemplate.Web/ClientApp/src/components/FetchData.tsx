import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useAppDispatch, useAppSelector } from '../store';
import { weatherForecastsActionCreators } from '../store/WeatherForecasts';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 'bold'
  }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover
  },
}));

const FetchData: React.FC = () => {
  const state = useAppSelector(state => state.weatherForecasts)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  // получаем значение startDateIndex из текущего URL-адреса, согласно пути маршрута (route).
  const { startDateIndex } = useParams();
  const startDateIndexNum = startDateIndex == undefined
    ? 0
    : parseInt(startDateIndex, 10) || 0;

  // хук (hook) запускает указанный внутри код после рендеринга, чтобы синхронизировать компонент с какой-либо системой вне React.
  React.useEffect(() => {
    // Загружайте данные только в том случае, если их у нас еще нет (и они еще не загружаются)
    if (!state.isLoading && (state.startDateIndex != startDateIndexNum || state.forecasts.length == 0))
      weatherForecastsActionCreators.requestWeatherForecasts(dispatch, startDateIndexNum);
  });

  const renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell sx={{ width: { xs: '34%', sm: '25%' } }}>Дата</StyledTableCell>
          <StyledTableCell sx={{ width: { xs: '18%', sm: '25%' } }}>℃</StyledTableCell>
          <StyledTableCell sx={{ width: { xs: '18%', sm: '25%' } }}>℉</StyledTableCell>
          <StyledTableCell sx={{ width: { xs: '30%', sm: '25%' } }}>Погода</StyledTableCell>
        </TableRow>
      </TableHead>
    )
  }

  const renderTableBody = () => {
    return (
      <TableBody>
        {state.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) => (
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
    )
  }

  const renderForecastsTable = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          {renderTableHead()}
          {renderTableBody()}
        </Table>
      </TableContainer>
    );
  }

  const renderPagination = () => {
    const prevStartDateIndex = (state.startDateIndex || 0) - 5;
    const nextStartDateIndex = (state.startDateIndex || 0) + 5;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${prevStartDateIndex}`)}>Назад</Button>
        {state.isLoading && <span>Загрузка...</span>}
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${nextStartDateIndex}`)}>Далее</Button>
      </Box>
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

export default FetchData;
