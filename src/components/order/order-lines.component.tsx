import React, { ChangeEvent } from 'react';
import {
  Button,
  Checkbox,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core';
import { OrderLine, OrderLineStatus } from 'common/vm';
import * as classes from './order-lines.styles';

interface Props {
  lines: Array<OrderLine>;
  setLines: (lines: Array<OrderLine>) => void;
}

interface Column {
  id: 'selected' | 'status' | 'amount' | 'description';
  label: string;
  minWidth?: number;
}

const columns: Column[] = [
  { id: 'selected', label: '', minWidth: 30 },
  { id: 'status', label: 'Estado', minWidth: 100 },
  {
    id: 'description',
    label: 'Descripción',
    minWidth: 500,
  },
  {
    id: 'amount',
    label: 'Importe (€)',
    minWidth: 100,
  },
];

export const OrderLinesComponent: React.FC<Props> = ({ lines, setLines }) => {
  const [checked, setChecked] = React.useState(false);
  const isValidOrderLine = (lineNumber: number): boolean =>
    !!lines[lineNumber].description && (lines[lineNumber].amount === 0 || !!lines[lineNumber].amount);

  const isOrderLineChecked = (index: number): boolean => lines[index].selected;

  const getOrderLineStatus = (orderLineNumber: number) =>
    isValidOrderLine(orderLineNumber) ? lines[orderLineNumber].status : '';

  const validateSelected = (validate: boolean) => {
    const orderLinesFilledIn = lines.filter(
      (l) => !!l.description && !!l.amount
    );
    orderLinesFilledIn
      .filter((l) => l.selected === true)
      .map(
        (l) =>
          (l.status = validate
            ? OrderLineStatus.Validated
            : OrderLineStatus.Pending)
      );

    setLines([...lines]);
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const [fieldName, orderLineNumber] = e.currentTarget.name.split('-');
    const orderLine: OrderLine = lines[orderLineNumber];
    orderLine[fieldName] =
      e.currentTarget.type === 'number'
        ? Number.parseFloat(e.currentTarget.value)
        : e.currentTarget.value;
    orderLine.selected =
      orderLine.selected && !!orderLine.description && !!orderLine.amount;
    orderLine.status =
      orderLine.status === OrderLineStatus.Validated &&
      !!orderLine.description &&
      !!orderLine.amount
        ? OrderLineStatus.Validated
        : OrderLineStatus.Pending;
    setLines([...lines]);
  };

  const handleOrderLineCheck = (e: ChangeEvent<HTMLInputElement>) => {
    const [fieldName, orderLineNumber] = e.currentTarget.name.split('-');
    const orderLine: OrderLine = lines[orderLineNumber];
    orderLine[fieldName] = e.currentTarget.checked;
    setLines([...lines]);
  };

  const handleCheckAll = (e: ChangeEvent<HTMLInputElement>) => {
    lines
      .filter((l) => !!l.description && !!l.amount)
      .map((l) => (l.selected = !checked));
    setChecked(!checked);
    setLines([...lines]);
  };

  return (
    <div>
      <br></br>
      <Grid container direction="column">
        <Grid container direction="row">
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={validateSelected.bind(null, true)}
            >
              Validar
            </Button>
            &nbsp;
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={validateSelected.bind(null, false)}
            >
              Invalidar
            </Button>
          </Grid>
        </Grid>
        <br></br>
        <Grid container>
          <Paper className={classes.container}>
            <TableContainer className={classes.table}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label === '' ? (
                          <Checkbox name="checkAll" onChange={handleCheckAll} />
                        ) : (
                          column.label
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lines.map((line, index) => {
                    return (
                      <TableRow hover tabIndex={-1} key={index}>
                        {columns.map((column) => {
                          return (
                            <TableCell key={column.id}>
                              {column.id === 'selected' ? (
                                <Checkbox
                                  inputProps={{ name: `${column.id}-${index}` }}
                                  disabled={!isValidOrderLine(index)}
                                  onChange={handleOrderLineCheck}
                                  checked={isOrderLineChecked(index)}
                                  style={{ minWidth: column.minWidth }}
                                />
                              ) : column.id !== 'status' ? (
                                <TextField
                                  type={
                                    column.id === 'amount' ? 'number' : 'text'
                                  }
                                  inputProps={{ name: `${column.id}-${index}` }}
                                  onChange={handleFieldChange}
                                  style={{ minWidth: column.minWidth }}
                                  value={
                                    column.id === 'amount'
                                      ? line.amount
                                      : line.description
                                  }
                                />
                              ) : (
                                <TextField
                                  type="text"
                                  inputProps={{ name: `${column.id}-${index}` }}
                                  disabled
                                  value={getOrderLineStatus(index)}
                                  style={{ minWidth: column.minWidth }}
                                />
                              )}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
