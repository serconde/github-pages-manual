import React from 'react';
import { PictureShopContextProvider } from 'common/context';
import { PictureListRouter } from 'components/picture-catalog';
import { ShoppingCartContainer } from 'components/shopping-cart';
import { AppLayout } from 'layout';
import { Divider, withStyles } from '@material-ui/core';

const CenteredDivider = withStyles({
  root: {
    width: '2px',
    margin: '0 20px 0px 30px',
    height: '550px',
  },
})(Divider);

export const App: React.FC = () => {
  return (
    <PictureShopContextProvider locale="en-US" currency="USD">
      <AppLayout>
        <PictureListRouter></PictureListRouter>
        <CenteredDivider orientation="vertical" flexItem />
        <ShoppingCartContainer></ShoppingCartContainer>
      </AppLayout>
    </PictureShopContextProvider>
  );
};
