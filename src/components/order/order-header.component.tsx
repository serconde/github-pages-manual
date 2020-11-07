import React, { ChangeEvent, SyntheticEvent } from 'react';
import { OrderHeader } from 'common/vm';
import { Button, Grid, Paper, TextField } from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as classes from './order-header.styles';

interface Props {
  header: OrderHeader;
  setHeader: (header: OrderHeader) => void;
  submit: () => void;
}

export const OrderHeaderComponent: React.FC<Props> = ({
  header,
  setHeader,
  submit,
}) => {
  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.currentTarget.name;
    const fieldValue = e.currentTarget.value;
    header[fieldName] = fieldValue;  
    setHeader({...header});
  };

  const handleOnSubmit = (e) => {
    submit();
  }

  return (
    <div>
      <h1>Pedido a proveedor</h1>
      <Paper className={classes.container} elevation={3}>
        <Formik
          initialValues={{
            reference: header.reference,
            provider: header.provider,
            date: header.date,
          }}
          onSubmit={handleOnSubmit}
        >
          <Form>
            <Grid container direction="row" spacing={3}>
              <Grid item>
                <label className={classes.fieldLabel} htmlFor="reference">
                  Referencia
                </label>
                <Field
                  inputProps={{name: "reference"}}
                  component={TextField}
                  size="small"
                  variant="outlined"                  
                  onChange={handleFieldChange}
                  value={header.reference}                
                />
              </Grid>
              <Grid item>
                <label className={classes.fieldLabel} htmlFor="provider">
                  Proveedor
                </label>
                <Field                  
                  inputProps={{name: "provider"}}
                  component={TextField}
                  size="small"
                  variant="outlined"
                  onChange={handleFieldChange}
                  value={header.provider}  
                />
              </Grid>
              <Grid item>
                <label className={classes.fieldLabel} htmlFor="date">
                  Fecha
                </label>
                <Field
                  inputProps={{name: "date"}}
                  type="date"
                  component={TextField}
                  size="small"
                  variant="outlined"
                  onChange={handleFieldChange}
                  value={header.date}      
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={3}>
              <Grid item>
                <label className={classes.fieldLabel} htmlFor="amount">
                  Importe Total
                </label>
                <Field
                  component={TextField}
                  size="small"
                  variant="outlined"
                  value={header.total}
                  disabled
                />
              </Grid>
              <Grid item>
                <label className={classes.fieldLabel} htmlFor="status">
                  Estado
                </label>
                <Field
                  component={TextField}
                  size="small"
                  variant="outlined"
                  value={header.status}
                  disabled
                />
              </Grid>
              <Grid item>
                <Button
                  className={classes.submitButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!header.valid}
                >
                  Enviar
                </Button>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      </Paper>
    </div>
  );
};
