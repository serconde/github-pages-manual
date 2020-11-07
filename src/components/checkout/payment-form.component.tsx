import React, { ChangeEvent } from 'react';
import Cards from 'react-credit-cards';
import { CardsStyles, errorClass } from './payment-form.styles';
import { TextField, Typography, withStyles } from '@material-ui/core';
import { formatCurrency } from 'common/utils';
import { formValidation } from './payment-form.validation';
import { StyledButton } from 'common/components';
import { Formik, Field, Form } from 'formik';

const FormInput = withStyles({
  root: {
    marginRight: 8,
    width: '100%',
  },
})(TextField);

interface Props {
  locale: string;
  currency: string;
  total: number;
  doPayment: () => void;
}

interface PaymentFormState {
  cvc: string;
  expiry: string;
  focus: string;
  name: string;
  number: string;
}

export const PaymentForm: React.FC<Props> = ({
  locale,
  currency,
  total,
  doPayment,
}) => {
  const [paymentFormState, setPaymentFormState] = React.useState<
    PaymentFormState
  >({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });


  const onInputChange = (e) => {
    const { name, value } = e.currentTarget;
    setPaymentFormState({ ...paymentFormState, [name]: value });
  };

  return (
    <Typography component="div">
      <h1>Payment</h1>
      <p>
        Total to pay: <strong>{formatCurrency(total, locale, currency)}</strong>
      </p>
      <CardsStyles>
        <Cards
          cvc={paymentFormState.cvc}
          expiry={paymentFormState.expiry}
          focused={paymentFormState.focus}
          name={paymentFormState.name}
          number={paymentFormState.number}
        />
      </CardsStyles>
      <br></br>
      <Formik
        enableReinitialize={true}
        initialValues={{
          name: '',
          number: '',
          expiry: undefined,
          cvc: '',
        }}
        onSubmit={doPayment}
        validate={formValidation.validateForm}        
      >
        {({ errors, touched, setFieldValue }) => {
          const handleFieldChange= (e: ChangeEvent<HTMLInputElement>) => {
            e.persist();
            onInputChange(e);
            setFieldValue(e.currentTarget.name, e.currentTarget.value);
          }
          return (<Form>
            <FormInput
              id="name"
              inputProps={{name: "name"}}
              type="text"
              placeholder="Name"
              onChange={handleFieldChange} 
            />
            {touched.name && errors.name && (
              <span id="name-error" className={errorClass}>
                {errors.name}
              </span>
            )}
            <FormInput
              id="number"
              type="tel"
              name="number" 
              inputProps={{maxLength: 19}}
              placeholder="Card Number"              
              onChange={handleFieldChange} 
            />
            {touched.number && errors.number && (
              <span id="name-error" className={errorClass}>
                {errors.number}
              </span>
            )}
            <FormInput
              id="expiry"
              type="date"
              name="expiry" 
              placeholder="Valid Thru"
              onChange={handleFieldChange} 
            />
            {touched.expiry && errors.expiry && (
              <span id="name-error" className={errorClass}>
                {errors.expiry}
              </span>
            )}
            <FormInput
              id="cvc"
              type="tel"
              name="cvc" 
              inputProps={{maxLength: 3}}
              placeholder="CVC"
              onChange={handleFieldChange} 
            />
            {touched.cvc && errors.cvc && (
              <span id="name-error" className={errorClass}>
                {errors.cvc}
              </span>
            )}
            <br/><br/>
            <StyledButton type="submit">Pay</StyledButton>
          </Form>)
        }
      }
      </Formik>
    </Typography>
  );
};
