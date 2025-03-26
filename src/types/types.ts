export type FinancialCard = {
    name: string;
    id: string;
    date: string;
    currency: string;
    category: string
    amount: number;
  };

  export interface TransactionCardProps {
    id: string
    name: string
    amount: number
    currency: string
    category: string
    date: string
    convertedAmount?: number
    baseCurrency?: string
  }