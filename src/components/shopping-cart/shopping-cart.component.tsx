import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  List,
  ListItemAvatar,
  Avatar,
  IconButton,
  withStyles,
  Snackbar,
} from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import { PictureInfo } from 'common/vm/picture.vm';
import * as classes from './shopping-cart.styles';
import { formatCurrency } from 'common/utils';
import { PaymentFormContainer } from 'components/checkout';
import { StyledButton } from 'common/components';

const EmptyTrashButton = withStyles({
  root: {
    boxSizing: 'border-box',
    paddingTop: '7px',
  },
})(IconButton);

const ListItemName = withStyles({
  root: {
    width: '100px',
  },
})(ListItemText);

const getTotal = (prices: number[]) =>
  prices.reduce((sum, price) => sum + price);

interface ShoppingCartProps {
  pictures: PictureInfo[];
  onRemovePicture: (pictureId: string) => void;
  onEmptyShoppingCart: () => void;
  locale: string;
  currency: string;
}

export const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  pictures,
  onRemovePicture,
  onEmptyShoppingCart,
  locale,
  currency,
}) => {
  const [proceedToCheckout, setProceedToCheckout] = React.useState(false);
  const [paymentDone, setPaymentDone] = React.useState(false);

  const handleClickRemove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    onRemovePicture(event.currentTarget.dataset.id);
  };

  const handleClickEmptyCart = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    onEmptyShoppingCart();
  };

  const handleClickCheckout = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => setProceedToCheckout(true);

  const handleOnClosePaymentDone = () => setPaymentDone(false);

  const onCloseCheckout = () => setProceedToCheckout(false);

  const doPayment = () => {
    setProceedToCheckout(false);
    setPaymentDone(true);
    onEmptyShoppingCart();
  };

  return (
    <div>
      <div className={classes.headerStyles}>
        <ShoppingCartIcon style={{ fontSize: 40 }}></ShoppingCartIcon>
        <h2 className={classes.headerTitleStyles}>Cart</h2>
        {pictures.length > 0 && (
          <EmptyTrashButton onClick={handleClickEmptyCart}>
            <DeleteIcon />
          </EmptyTrashButton>
        )}
      </div>
      <List>
        {pictures.map((p) => {
          return (
            <ListItem button key={p.id}>
              <ListItemAvatar>
                <Avatar alt={p.name} src={'images/' + p.picUrl} />
              </ListItemAvatar>
              <ListItemName primary={p.name} />
              <ListItemText
                secondary={formatCurrency(p.price, locale, currency)}
              />
              <ListItemIcon data-id={p.id} onClick={handleClickRemove}>
                <DeleteIcon />
              </ListItemIcon>
            </ListItem>
          );
        })}
        {pictures.length > 0 && (
          <ListItem button key="total">
            <ListItemName primary="Total" />
            <ListItemText
              secondary={formatCurrency(
                getTotal(pictures.map((p) => p.price)),
                locale,
                currency
              )}
            />
          </ListItem>
        )}
      </List>
      {pictures.length > 0 && (
        <StyledButton variant="contained" onClick={handleClickCheckout}>
          Go to Checkout
        </StyledButton>
      )}
      <PaymentFormContainer
        locale={locale}
        currency={currency}
        total={getTotal(!!pictures.length ? pictures.map((p) => p.price) : [0])}
        opened={proceedToCheckout}
        onClose={onCloseCheckout}
        doPayment={doPayment}
      />
      <Snackbar
        open={paymentDone}
        autoHideDuration={3000}
        onClose={handleOnClosePaymentDone}
        key="topcenter"
      >
        <Alert severity="success" onClose={handleOnClosePaymentDone}>
          Thank you for your purchase!
        </Alert>
      </Snackbar>
    </div>
  );
};
