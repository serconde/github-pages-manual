import React from 'react';
import { AppLayout } from 'layout';
import { OrderContextProvider } from 'common/context';
import { OrderContainer } from 'components/order';

export const App: React.FC = () => {
  return (
    <OrderContextProvider>
      <AppLayout>
        <OrderContainer />
      </AppLayout>
    </OrderContextProvider>
  );
};
