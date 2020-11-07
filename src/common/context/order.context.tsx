import React from 'react';
import { createEmptyOrderHeader, creatyEmptyOrderLines, maxOrderLines, OrderHeader, OrderLine } from 'common/vm';

interface Context {
  header: OrderHeader;
  lines: Array<OrderLine>;
  setHeader: (header: OrderHeader) => void;
  setLines: (lines: Array<OrderLine>) => void;
}

export const OrderContext = React.createContext<Context>({
  header: createEmptyOrderHeader(),
  lines: [],
  setHeader: (header: OrderHeader) => {},
  setLines: (lines: Array<OrderLine>) => {},
});

export const OrderContextProvider: React.FC = ({ children }) => {  
  const [header, setHeader] = React.useState(createEmptyOrderHeader());
  const [lines, setLines] = React.useState(creatyEmptyOrderLines(maxOrderLines));

  return (
    <OrderContext.Provider value={{ header, setHeader, lines, setLines }}>
      {children}
    </OrderContext.Provider>
  );
};
