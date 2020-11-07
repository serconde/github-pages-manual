import { Validators, ValidationSchema, createFormValidation } from '@lemoncode/fonk';
import { createFormikValidation } from '@lemoncode/fonk-formik';

const validationSchema: ValidationSchema = {
  field: {
    name: [
      {
        validator: Validators.required,
        message: 'The name is required',
      },
    ],
    number: [
      {
        validator: Validators.required,
        message: 'The credit card number is required',
      },      
    ],
    cvc: [
      {
        validator: Validators.required,
        message: 'The cvc is required',
      },            
    ],
    expiry: [      
      {
        validator: Validators.required,
        message: 'The expiry date is required',
      },
    ],
  },
};

export const formValidation = createFormikValidation(validationSchema);