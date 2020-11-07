import React from 'react';
import { OrderContext } from 'common/context';
import { OrderHeaderComponent } from './order-header.component';
import { OrderLinesComponent } from './order-lines.component';
import {
  createEmptyOrderHeader,
  creatyEmptyOrderLines,
  maxOrderLines,
  OrderLineStatus,
} from 'common/vm';
import { formatCurrency } from 'common/utils';
import { useDebounce } from 'use-debounce/lib';
import { AlertDialogComponent } from 'common/components/alert-dialog';

export const OrderContainer: React.FC = () => {
  const { header, lines, setHeader, setLines } = React.useContext(OrderContext);
  const [orderDispatched, setOrderDispatched] = React.useState(false);

  const submit = () => {
    setOrderDispatched(true);
  };

  const dispatchOrder = () => {
    setHeader(createEmptyOrderHeader());
    setLines(creatyEmptyOrderLines(maxOrderLines));
    setOrderDispatched(false);
  };

  const [debouncedLines] = useDebounce(lines, 500);
  const [debouncedHeader] = useDebounce(header, 500);

  React.useEffect(() => {
    const orderLinesFilledIn = debouncedLines.filter(
      (l) => !!l.description && !!l.amount
    );
    let total = 0;
    orderLinesFilledIn.map((l) => (total += l.amount));
    header.total = formatCurrency(total);
    header.status =
      orderLinesFilledIn.length === 0
        ? '0 %'
        : `${
            (orderLinesFilledIn.filter(
              (l) => l.status === OrderLineStatus.Validated
            ).length *
              100) /
            orderLinesFilledIn.length
          } %`;

    debouncedHeader.valid =
      !!debouncedHeader.reference &&
      !!debouncedHeader.provider &&
      !!debouncedHeader.date &&
      debouncedHeader.status === '100 %';
    setHeader({ ...header });
  }, [debouncedLines]);

  return (
    <>
      <OrderHeaderComponent
        header={debouncedHeader}
        setHeader={setHeader}
        submit={submit}
      ></OrderHeaderComponent>
      <OrderLinesComponent
        lines={debouncedLines}
        setLines={setLines}
      ></OrderLinesComponent>
      <AlertDialogComponent
        open={orderDispatched}
        title={'Enhorabuena!'}
        message={'El pedido ha sido enviado'}
        buttonText={'Cerrar'}
        onClose={dispatchOrder}
      />
    </>
  );
};
