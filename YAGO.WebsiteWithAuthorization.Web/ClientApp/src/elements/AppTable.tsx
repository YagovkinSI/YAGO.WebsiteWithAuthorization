import * as React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, styled, SxProps } from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';

export interface AppTableColumn {
  title: string,
  sx: SxProps
}

export interface AppTableRow {
  key: string,
  cells: string[]
}

export interface AppTableProps {
  columnList: AppTableColumn[],
  rowList: AppTableRow[]
}

const AppTable: React.FC<AppTableProps> = (props) => {

  const render = () => {
    return (
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          {renderTableHead()}
          {renderTableBody()}
        </Table>
      </TableContainer>
    );
  }

  const renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          {props.columnList.map((column: AppTableColumn, index) => (
            <StyledTableCell key={index} sx={column.sx}>{column.title}</StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    )
  }

  const renderTableBody = () => {
    return (
      <TableBody>
        {props.rowList.map((row: AppTableRow) => (
          <StyledTableRow
            key={row.key}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            {row.cells.map((cell: string) => (
              <StyledTableCell key={cell}>{cell}</StyledTableCell>
            ))}
          </StyledTableRow >
        ))}
      </TableBody>
    )
  }

  return render();
}

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

export default AppTable;
