import { formatCurrency } from 'common/utils';
import { OrderHeader, OrderLine, OrderLineStatus } from './order.vm';

export const today = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString();
  return `${year}-${month}-${day}`;
};

export const maxOrderLines = 20;

export const createEmptyOrderLine = (): OrderLine => ({
  selected: false,
  status: OrderLineStatus.Pending,
  description: '',
  amount: 0,
});

export const createEmptyOrderHeader = (): OrderHeader => ({
  reference: '',
  provider: '',
  date: today(),
  total: formatCurrency(0),
  status: '0 %',
  valid: false,
});

export const creatyEmptyOrderLines = (numberOfLines: number): Array<OrderLine> => [...new Array(numberOfLines)].map(() => createEmptyOrderLine());
