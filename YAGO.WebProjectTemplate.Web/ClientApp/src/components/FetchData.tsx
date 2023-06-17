import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as WeatherForecastsStore from '../store/WeatherForecasts';
import { Box, Button, Paper, Table, TableBody, TableContainer, TableHead, TableRow, styled } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useWeatherForecastsQuery } from '../store/WeatherForecasts';

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
  const navigate = useNavigate()

  // получаем значение startDateIndex из текущего URL-адреса, согласно пути маршрута (route).
  const { startDateIndex } = useParams();
  const startDateIndexNum = startDateIndex == undefined
    ? 0
    : parseInt(startDateIndex, 10) || 0;

  // Использование хука (hook) запроса автоматически извлекает данные и возвращает значения запроса
  const { data, isLoading } = useWeatherForecastsQuery(startDateIndexNum)

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
        {data?.map((forecast: WeatherForecastsStore.WeatherForecast) => (
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
    const prevStartDateIndex = startDateIndexNum - 5;
    const nextStartDateIndex = startDateIndexNum + 5;
    return (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
        <Button variant='outlined' onClick={() => navigate(`/fetch-data/${prevStartDateIndex}`)}>Назад</Button>
        {isLoading && <span>Загрузка...</span>}
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
