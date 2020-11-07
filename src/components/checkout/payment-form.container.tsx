import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { PaymentForm } from './payment-form.component';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  return {
    top: "33%",
    left: "50%",
    transform: `translate(-50%, -33%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      borderRadius: 4,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

interface Props {
  opened: boolean;
  locale: string;
  currency: string;
  total: number;
  onClose: () => void;
  doPayment: () => void;
}

export const PaymentFormContainer: React.FC<Props> = ({
  opened,
  onClose,
  locale,
  currency,
  total,
  doPayment,
}) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const handleClose = () => {
    onClose();
  };

  return (
    <Modal
      open={opened}
      onClose={handleClose}
      aria-labelledby="Checkout"
      aria-describedby="Checkout"
    >
      <div style={modalStyle} className={classes.paper}>
        <PaymentForm
          locale={locale}
          currency={currency}
          total={total}
          doPayment={doPayment}
        />
      </div>
    </Modal>
  );
};
